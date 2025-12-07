const express = require('express');
const cors = require('cors');
const Database = require('better-sqlite3');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

// LLM Configuration
const LLM_ENDPOINT = process.env.LLM_ENDPOINT || 'https://litellm.kisrv.com';
const LLM_API_KEY = process.env.LLM_API_KEY || 'sk-kSIPvdwZkrIE8gmxFPpe6Q';

// Database setup
const dbPath = process.env.DB_PATH || path.join(__dirname, 'useful-work.db');
const db = new Database(dbPath);

// Initialize tables
db.exec(`
  CREATE TABLE IF NOT EXISTS items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    text TEXT NOT NULL,
    axes TEXT NOT NULL,
    status TEXT NOT NULL CHECK(status IN ('planned', 'completed')),
    created_at TEXT NOT NULL,
    completed_at TEXT,
    updated_at TEXT NOT NULL
  )
`);

// Middleware
app.use(cors());
app.use(express.json());

// System prompt for the CUI
const SYSTEM_PROMPT = `You are a thoughtful coach helping someone plan their day and reflect on their work using the "Useful Work" framework.

## Your Role
- In the MORNING/PLANNING: Help them identify small, useful things they could bring into reality today
- In the EVENING/REFLECTION: Help them recognise what they accomplished across the four axes
- Ask thought-provoking questions that help them think clearly about their work
- Be warm, encouraging, and philosophical without being preachy
- Keep responses concise but meaningful

## The Useful Work Framework

The core question isn't "Did I ship something?" but "Did I bring something useful into reality?"

### The Four Axes of Useful Work:

1. **Existence** - "Did I bring something into reality?"
   Something now exists that didn't before—code, document, design, decision, conversation, insight.

2. **Recipient** - "Useful for whom or what?"
   - Myself (personal tooling, learning, clarity)
   - A user (direct value delivery)
   - A system (infrastructure, automation)
   - A future state (enabling work not yet possible)

3. **Purpose** - "Useful for what?"
   - Solves a problem
   - Removes friction
   - Enables capability
   - Creates clarity

4. **Elegance** - "Is it positioned to be used?"
   - Right location (accessible)
   - Atomised (appropriately scoped)
   - Documented (understandable)
   - Integrated (connected)

### Key Philosophy:
- Progress is multidimensional, not binary (done/not done)
- Movement along ANY axis represents real progress
- The satisfaction of good work comes from movement, not crossing a finish line that doesn't exist
- "Smallest useful unit" - work should be sized to what can flow cleanly through a focused session

## Your Capabilities
You can help the user by:
1. Adding planned items for their day
2. Adding completed/reflected items
3. Marking planned items as complete
4. Viewing their current plans and completions

When a user describes something they want to do or have done, help them identify which axes apply:
- existence, recipient, purpose, elegance

Be conversational and warm. Ask follow-up questions. Help them think through the "useful for whom?" and "useful for what?" questions.

## Current Context
Today's date: ${new Date().toLocaleDateString('en-AU', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
`;

// Tool definitions for function calling
const tools = [
  {
    type: 'function',
    function: {
      name: 'get_items',
      description: 'Get all items (both planned and completed) to see what the user has on their list',
      parameters: {
        type: 'object',
        properties: {
          status: {
            type: 'string',
            enum: ['planned', 'completed', 'all'],
            description: 'Filter by status. Use "all" to get everything.'
          }
        }
      }
    }
  },
  {
    type: 'function',
    function: {
      name: 'add_item',
      description: 'Add a new item to the user\'s list. Use this when they describe something they plan to do (status=planned) or something they\'ve completed (status=completed)',
      parameters: {
        type: 'object',
        properties: {
          text: {
            type: 'string',
            description: 'Description of the work item'
          },
          axes: {
            type: 'array',
            items: {
              type: 'string',
              enum: ['existence', 'recipient', 'purpose', 'elegance']
            },
            description: 'Which axes this work moves along'
          },
          status: {
            type: 'string',
            enum: ['planned', 'completed'],
            description: 'Whether this is planned work or completed work'
          }
        },
        required: ['text', 'axes', 'status']
      }
    }
  },
  {
    type: 'function',
    function: {
      name: 'complete_item',
      description: 'Mark a planned item as completed',
      parameters: {
        type: 'object',
        properties: {
          item_id: {
            type: 'integer',
            description: 'The ID of the item to mark as completed'
          }
        },
        required: ['item_id']
      }
    }
  },
  {
    type: 'function',
    function: {
      name: 'delete_item',
      description: 'Delete an item from the list',
      parameters: {
        type: 'object',
        properties: {
          item_id: {
            type: 'integer',
            description: 'The ID of the item to delete'
          }
        },
        required: ['item_id']
      }
    }
  }
];

// Execute tool calls
function executeTool(name, args) {
  switch (name) {
    case 'get_items': {
      const status = args.status || 'all';
      let items;
      if (status === 'all') {
        items = db.prepare('SELECT * FROM items ORDER BY created_at DESC').all();
      } else {
        items = db.prepare('SELECT * FROM items WHERE status = ? ORDER BY created_at DESC').all(status);
      }
      return items.map(item => ({
        ...item,
        axes: JSON.parse(item.axes)
      }));
    }
    case 'add_item': {
      const { text, axes, status } = args;
      const now = new Date().toISOString();
      const completedAt = status === 'completed' ? now : null;
      const stmt = db.prepare(`
        INSERT INTO items (text, axes, status, created_at, completed_at, updated_at)
        VALUES (?, ?, ?, ?, ?, ?)
      `);
      const result = stmt.run(text, JSON.stringify(axes), status, now, completedAt, now);
      return {
        id: result.lastInsertRowid,
        text,
        axes,
        status,
        created_at: now
      };
    }
    case 'complete_item': {
      const { item_id } = args;
      const existing = db.prepare('SELECT * FROM items WHERE id = ?').get(item_id);
      if (!existing) {
        return { error: 'Item not found' };
      }
      const now = new Date().toISOString();
      db.prepare(`
        UPDATE items SET status = 'completed', completed_at = ?, updated_at = ? WHERE id = ?
      `).run(now, now, item_id);
      return { success: true, message: `Item ${item_id} marked as completed` };
    }
    case 'delete_item': {
      const { item_id } = args;
      const existing = db.prepare('SELECT * FROM items WHERE id = ?').get(item_id);
      if (!existing) {
        return { error: 'Item not found' };
      }
      db.prepare('DELETE FROM items WHERE id = ?').run(item_id);
      return { success: true, message: `Item ${item_id} deleted` };
    }
    default:
      return { error: `Unknown tool: ${name}` };
  }
}

// Chat endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const { messages } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'Messages array required' });
    }

    // Build messages with system prompt
    const fullMessages = [
      { role: 'system', content: SYSTEM_PROMPT },
      ...messages
    ];

    // Initial LLM call
    let response = await fetch(`${LLM_ENDPOINT}/v1/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${LLM_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: fullMessages,
        tools: tools,
        tool_choice: 'auto'
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('LLM API error:', errorText);
      return res.status(500).json({ error: 'LLM API error', details: errorText });
    }

    let data = await response.json();
    let assistantMessage = data.choices[0].message;

    // Handle tool calls in a loop
    while (assistantMessage.tool_calls && assistantMessage.tool_calls.length > 0) {
      // Add assistant message with tool calls to conversation
      fullMessages.push(assistantMessage);

      // Execute each tool call
      for (const toolCall of assistantMessage.tool_calls) {
        const functionName = toolCall.function.name;
        const functionArgs = JSON.parse(toolCall.function.arguments);

        console.log(`Executing tool: ${functionName}`, functionArgs);
        const toolResult = executeTool(functionName, functionArgs);

        // Add tool result to conversation
        fullMessages.push({
          role: 'tool',
          tool_call_id: toolCall.id,
          content: JSON.stringify(toolResult)
        });
      }

      // Get next response from LLM
      response = await fetch(`${LLM_ENDPOINT}/v1/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${LLM_API_KEY}`
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: fullMessages,
          tools: tools,
          tool_choice: 'auto'
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('LLM API error:', errorText);
        return res.status(500).json({ error: 'LLM API error', details: errorText });
      }

      data = await response.json();
      assistantMessage = data.choices[0].message;
    }

    // Return the final text response
    res.json({
      message: assistantMessage.content,
      usage: data.usage
    });

  } catch (error) {
    console.error('Chat error:', error);
    res.status(500).json({ error: 'Chat failed', details: error.message });
  }
});

// GET all items
app.get('/api/items', (req, res) => {
  try {
    const items = db.prepare('SELECT * FROM items ORDER BY created_at DESC').all();
    const parsed = items.map(item => ({
      ...item,
      axes: JSON.parse(item.axes)
    }));
    res.json(parsed);
  } catch (error) {
    console.error('Error fetching items:', error);
    res.status(500).json({ error: 'Failed to fetch items' });
  }
});

// GET items by status
app.get('/api/items/:status', (req, res) => {
  try {
    const { status } = req.params;
    if (!['planned', 'completed'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }
    const items = db.prepare('SELECT * FROM items WHERE status = ? ORDER BY created_at DESC').all(status);
    const parsed = items.map(item => ({
      ...item,
      axes: JSON.parse(item.axes)
    }));
    res.json(parsed);
  } catch (error) {
    console.error('Error fetching items:', error);
    res.status(500).json({ error: 'Failed to fetch items' });
  }
});

// POST new item
app.post('/api/items', (req, res) => {
  try {
    const { text, axes, status } = req.body;

    if (!text || !axes || !status) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const now = new Date().toISOString();
    const completedAt = status === 'completed' ? now : null;

    const stmt = db.prepare(`
      INSERT INTO items (text, axes, status, created_at, completed_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?)
    `);

    const result = stmt.run(text, JSON.stringify(axes), status, now, completedAt, now);

    res.status(201).json({
      id: result.lastInsertRowid,
      text,
      axes,
      status,
      created_at: now,
      completed_at: completedAt,
      updated_at: now
    });
  } catch (error) {
    console.error('Error creating item:', error);
    res.status(500).json({ error: 'Failed to create item' });
  }
});

// PUT update item (e.g., mark as completed)
app.put('/api/items/:id', (req, res) => {
  try {
    const { id } = req.params;
    const { text, axes, status } = req.body;

    const existing = db.prepare('SELECT * FROM items WHERE id = ?').get(id);
    if (!existing) {
      return res.status(404).json({ error: 'Item not found' });
    }

    const now = new Date().toISOString();
    const completedAt = status === 'completed' ? now : null;

    const stmt = db.prepare(`
      UPDATE items
      SET text = COALESCE(?, text),
          axes = COALESCE(?, axes),
          status = COALESCE(?, status),
          completed_at = ?,
          updated_at = ?
      WHERE id = ?
    `);

    stmt.run(
      text || null,
      axes ? JSON.stringify(axes) : null,
      status || null,
      completedAt,
      now,
      id
    );

    const updated = db.prepare('SELECT * FROM items WHERE id = ?').get(id);
    res.json({
      ...updated,
      axes: JSON.parse(updated.axes)
    });
  } catch (error) {
    console.error('Error updating item:', error);
    res.status(500).json({ error: 'Failed to update item' });
  }
});

// DELETE item
app.delete('/api/items/:id', (req, res) => {
  try {
    const { id } = req.params;

    const existing = db.prepare('SELECT * FROM items WHERE id = ?').get(id);
    if (!existing) {
      return res.status(404).json({ error: 'Item not found' });
    }

    db.prepare('DELETE FROM items WHERE id = ?').run(id);
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting item:', error);
    res.status(500).json({ error: 'Failed to delete item' });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Useful Work API running on port ${PORT}`);
});
