import { useState, useEffect, useCallback } from 'react';
import * as api from '../api';
import ChatView from './ChatView';

// Theory Modal Component
function TheoryModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[85vh] overflow-hidden flex flex-col">
        <div className="overflow-y-auto flex-1">
          <div className="p-6 sm:p-8 prose prose-stone prose-sm max-w-none">
            <h1 className="text-2xl font-serif text-stone-800 mb-1">Useful Work</h1>
            <p className="text-stone-500 italic text-base mt-0 mb-6">A Flow-Native Framework for Meaningful Progress in the Age of AI-Assisted Development</p>

            <hr className="my-6 border-stone-200" />

            <h2 className="text-lg font-serif text-stone-800 mt-6 mb-3">The Phase Transition</h2>
            <p className="text-stone-600 leading-relaxed">We are living through a phase transition in how work manifests.</p>
            <p className="text-stone-600 leading-relaxed">Traditional software development accumulated work into artifacts—features, releases, deployments. Value crystallised into <em>things</em> that got <em>moved</em>. The "shipping" metaphor made sense because that's literally what happened: code was packaged, boxed (metaphorically or literally), and delivered somewhere else.</p>
            <p className="text-stone-600 leading-relaxed">But something fundamental has changed.</p>
            <p className="text-stone-600 leading-relaxed">When you can iterate with AI agents in minutes what used to take days, the economics flip. It becomes cheaper to generate a bespoke solution than to find, adapt, and deploy an existing one. Artifacts dissolve back into flow.</p>
            <p className="text-stone-600 leading-relaxed">This isn't just a technical shift—it's a phase transition from <strong>reservoir thinking</strong> to <strong>current thinking</strong>. From counting what's stored to observing what's moving.</p>
            <p className="text-stone-600 leading-relaxed">The discomfort many people feel with traditional productivity language is the felt sense of this transition. The old metrics don't fit because the underlying physics have changed.</p>

            <hr className="my-6 border-stone-200" />

            <h2 className="text-lg font-serif text-stone-800 mt-6 mb-3">The Problem with "Shipping"</h2>
            <p className="text-stone-600 leading-relaxed">There's a word that dominates how we talk about productive work in technology: <em>shipped</em>.</p>
            <p className="text-stone-600 leading-relaxed">"Did you ship it?"<br/>"What did you ship this week?"<br/>"Ship fast, break things."</p>
            <p className="text-stone-600 leading-relaxed">The metaphor comes from a different era—one where software was burned onto CDs, boxed, and physically delivered. Shipping meant something was <em>done</em>. Complete. Out the door. The boundary between "in progress" and "finished" was as clear as whether or not there was shrink wrap on the box.</p>
            <p className="text-stone-600 leading-relaxed">But that's not how work happens anymore.</p>
            <p className="text-stone-600 leading-relaxed">Particularly not with AI-assisted development, where what used to take days now takes minutes. Where iteration isn't a phase that comes after shipping—it <em>is</em> the work. Where the boundaries between "building" and "built" dissolve into something far more fluid.</p>
            <p className="text-stone-600 leading-relaxed">And yet we keep using the language of finality to describe work that has no finish line.</p>
            <p className="text-stone-600 leading-relaxed">This creates a subtle but corrosive problem: <strong>the words we use to measure our work shape how we feel about our work.</strong> If "shipped" is the only thing that counts, and nothing ever feels truly shipped, then nothing ever feels like it counts.</p>

            <hr className="my-6 border-stone-200" />

            <h2 className="text-lg font-serif text-stone-800 mt-6 mb-3">The Real Question</h2>
            <p className="text-stone-600 leading-relaxed">The discomfort with "shipping" isn't laziness or avoidance. It's a legitimate mismatch between terminology and reality.</p>
            <p className="text-stone-600 leading-relaxed">The question isn't <em>"Did I ship something?"</em></p>
            <p className="text-stone-600 leading-relaxed">The question is: <strong><em>"Did I bring something useful into reality?"</em></strong></p>
            <p className="text-stone-600 leading-relaxed">This reframe does several important things:</p>
            <ul className="text-stone-600 space-y-1">
              <li><strong>Removes the finality pressure.</strong> "Into reality" doesn't imply an end state—just that something now exists that didn't before.</li>
              <li><strong>Maintains forward momentum.</strong> It's still about creation, progress, movement.</li>
              <li><strong>Centres usefulness over completion.</strong> The measure isn't whether it's done, but whether it matters.</li>
              <li><strong>Allows for iteration without failure.</strong> Something can be real <em>and</em> evolving. These aren't contradictions.</li>
            </ul>

            <hr className="my-6 border-stone-200" />

            <h2 className="text-lg font-serif text-stone-800 mt-6 mb-3">The Four Axes of Useful Work</h2>
            <p className="text-stone-600 leading-relaxed">Here's the key insight: <strong>progress isn't binary—it's multidimensional.</strong></p>
            <p className="text-stone-600 leading-relaxed">Traditional productivity collapses everything into a single axis: done or not done. But meaningful work moves along multiple dimensions simultaneously. Recognising this transforms self-evaluation from a vague feeling ("did I do enough?") into an observable fact ("where did I move?").</p>

            <h3 className="text-base font-medium text-amber-700 mt-5 mb-2">Axis One: Existence</h3>
            <p className="text-stone-500 italic">"Did I bring something into reality?"</p>
            <p className="text-stone-600 leading-relaxed">The most fundamental dimension. Something now exists that didn't before. It might be code, a document, a design, a decision, a conversation, an insight. The act of creation itself—independent of polish or deployment.</p>
            <p className="text-stone-600 leading-relaxed"><strong>Examples:</strong> Created, built, wrote, designed, decided, clarified</p>

            <h3 className="text-base font-medium text-emerald-700 mt-5 mb-2">Axis Two: Recipient</h3>
            <p className="text-stone-500 italic">"Useful for whom or what?"</p>
            <p className="text-stone-600 leading-relaxed">Everything useful serves something. Defining the recipient grounds the work and prevents "busy for busy's sake."</p>
            <p className="text-stone-600 leading-relaxed"><strong>Possible recipients:</strong></p>
            <ul className="text-stone-600 space-y-1">
              <li>Myself (personal tooling, learning, clarity)</li>
              <li>A user (direct value delivery)</li>
              <li>A system (infrastructure, automation, another agent)</li>
              <li>A future state (enabling work that isn't possible yet)</li>
            </ul>

            <h3 className="text-base font-medium text-slate-600 mt-5 mb-2">Axis Three: Purpose</h3>
            <p className="text-stone-500 italic">"Useful for what?"</p>
            <p className="text-stone-600 leading-relaxed">The function the work serves. What problem does it solve? What capability does it create?</p>
            <p className="text-stone-600 leading-relaxed"><strong>Possible purposes:</strong></p>
            <ul className="text-stone-600 space-y-1">
              <li>Solves a problem</li>
              <li>Removes friction</li>
              <li>Enables capability</li>
              <li>Creates clarity</li>
            </ul>

            <h3 className="text-base font-medium text-rose-600 mt-5 mb-2">Axis Four: Deployment Elegance</h3>
            <p className="text-stone-500 italic">"Is it positioned to be used?"</p>
            <p className="text-stone-600 leading-relaxed">The polish dimension. Something can exist, have a clear recipient and purpose, but still not be <em>usable</em> yet. This axis captures the work of making things accessible, discoverable, integrated.</p>
            <p className="text-stone-600 leading-relaxed"><strong>Markers of elegance:</strong></p>
            <ul className="text-stone-600 space-y-1">
              <li>Right location (accessible where it needs to be)</li>
              <li>Atomised (appropriately scoped, not tangled)</li>
              <li>Documented (understandable by its recipient)</li>
              <li>Integrated (connected to what needs it)</li>
            </ul>

            <hr className="my-6 border-stone-200" />

            <h2 className="text-lg font-serif text-stone-800 mt-6 mb-3">Why the Axes Matter</h2>
            <p className="text-stone-600 leading-relaxed">The satisfaction of good work comes from <strong>movement along any axis</strong>—not from crossing a finish line that doesn't exist.</p>
            <p className="text-stone-600 leading-relaxed">Consider these scenarios:</p>

            <div className="overflow-x-auto my-4">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="border-b border-stone-200">
                    <th className="text-left py-2 pr-4 font-medium text-stone-700">What happened</th>
                    <th className="text-left py-2 pr-4 font-medium text-stone-700">Traditional framing</th>
                    <th className="text-left py-2 font-medium text-stone-700">Axis framing</th>
                  </tr>
                </thead>
                <tbody className="text-stone-600">
                  <tr className="border-b border-stone-100">
                    <td className="py-2 pr-4">Built a prototype that isn't deployed</td>
                    <td className="py-2 pr-4">"Not shipped" ❌</td>
                    <td className="py-2">Axis 1 ✓ (exists)</td>
                  </tr>
                  <tr className="border-b border-stone-100">
                    <td className="py-2 pr-4">Refined documentation for existing code</td>
                    <td className="py-2 pr-4">"Maintenance" 😐</td>
                    <td className="py-2">Axis 4 ✓ (elegance)</td>
                  </tr>
                  <tr className="border-b border-stone-100">
                    <td className="py-2 pr-4">Created infrastructure for future features</td>
                    <td className="py-2 pr-4">"No user impact" ❌</td>
                    <td className="py-2">Axis 2 ✓ (serves future state)</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4">Clarified a decision that was blocking work</td>
                    <td className="py-2 pr-4">"Just a meeting" 😐</td>
                    <td className="py-2">Axis 1 ✓, Axis 3 ✓ (created clarity)</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-stone-600 leading-relaxed">Each of these represents real progress. The axis framework makes that visible.</p>

            <hr className="my-6 border-stone-200" />

            <h2 className="text-lg font-serif text-stone-800 mt-6 mb-3">The Physics of Useful Work</h2>
            <p className="text-stone-600 leading-relaxed">The four axes aren't arbitrary categories—they map to fundamental properties of how intelligence flows through systems.</p>

            <h3 className="text-base font-medium text-stone-700 mt-5 mb-2">Intelligence as Flow</h3>
            <p className="text-stone-600 leading-relaxed">Intelligence—whether human or artificial—moves through organisations and individuals according to physical principles. Like electrical current or fluid dynamics, it follows paths of least resistance, accumulates where there's capacitance, and meets impedance at every junction.</p>
            <p className="text-stone-600 leading-relaxed">The governing relationship, adapted from Ohm's Law:</p>
            <blockquote className="border-l-4 border-amber-400 pl-4 py-2 my-4 bg-amber-50 rounded-r">
              <p className="text-stone-700 font-medium">Intelligence Flux = Demand Pressure / (Cognitive Impedance + Technical Impedance)</p>
            </blockquote>
            <p className="text-stone-600 leading-relaxed">Traditional productivity thinking focused on the numerator—pushing harder, working more, demanding output. "Use more AI! Be more productive!" This is pushing flux through a high-impedance system. It's grinding, expensive, and unsustainable.</p>
            <p className="text-stone-600 leading-relaxed">The actual leverage is in the denominator. <strong>Systematically reduce impedance so that flux becomes a natural consequence of demand meeting well-designed channels.</strong></p>

            <h3 className="text-base font-medium text-stone-700 mt-5 mb-2">How the Axes Map to Physics</h3>

            <p className="text-stone-600 leading-relaxed"><strong>Axis 1 (Existence) = Flux Observation</strong></p>
            <p className="text-stone-600 leading-relaxed">Did current flow? This is the most basic measurement—something moved, energy was transferred, work was done. The creation act itself, independent of where it went or what it's for.</p>

            <p className="text-stone-600 leading-relaxed mt-4"><strong>Axis 2 (Recipient) = Flow Topology</strong></p>
            <p className="text-stone-600 leading-relaxed">Where is intelligence flowing to? This defines the circuit:</p>
            <ul className="text-stone-600 space-y-1">
              <li><em>Myself</em> = local circuit, tightest loop, lowest latency</li>
              <li><em>A user</em> = external endpoint, longer path, more resistance</li>
              <li><em>A system</em> = machine-to-machine flow, different impedance profile</li>
              <li><em>Future state</em> = <strong>capacitance</strong>—you're charging a capacitor for later discharge</li>
            </ul>
            <p className="text-stone-600 leading-relaxed">That last category is significant. When you build infrastructure that enables future work, you're not creating flow <em>now</em>—you're storing potential that will discharge when demand appears. This is investment in capacitance, not immediate throughput.</p>

            <p className="text-stone-600 leading-relaxed mt-4"><strong>Axis 3 (Purpose) = Work Done</strong></p>
            <p className="text-stone-600 leading-relaxed">In physics, power = voltage × current. Purpose defines what work the flow is actually doing—what problem it solves, what friction it removes, what capability it enables. Flow without purpose is just heat dissipation.</p>

            <p className="text-stone-600 leading-relaxed mt-4"><strong>Axis 4 (Elegance) = Impedance Reduction</strong></p>
            <p className="text-stone-600 leading-relaxed">Look at what we defined as deployment elegance:</p>
            <ul className="text-stone-600 space-y-1">
              <li><em>Right location</em> = reducing retrieval impedance</li>
              <li><em>Atomised</em> = reducing integration impedance</li>
              <li><em>Documented</em> = reducing comprehension impedance</li>
              <li><em>Integrated</em> = reducing flow impedance between systems</li>
            </ul>
            <p className="text-stone-600 leading-relaxed">This axis isn't about aesthetics. It's about <strong>reducing the resistance between creation and use</strong>. Every improvement in elegance lowers the impedance for future flow. This is plumbing work—designing channels so intelligence can move freely.</p>

            <hr className="my-6 border-stone-200" />

            <h2 className="text-lg font-serif text-stone-800 mt-6 mb-3">The Ritual: Plan and Reflect</h2>
            <p className="text-stone-600 leading-relaxed">The framework becomes operational through two modes:</p>

            <h3 className="text-base font-medium text-stone-700 mt-5 mb-2">Plan Mode (Before)</h3>
            <p className="text-stone-500 italic">"What small useful thing could I bring into reality?"</p>
            <p className="text-stone-600 leading-relaxed">Before beginning work, define:</p>
            <ul className="text-stone-600 space-y-1">
              <li>What you're trying to create (Axis 1 target)</li>
              <li>Who or what it serves (Axis 2 clarity)</li>
              <li>What purpose it fulfils (Axis 3 grounding)</li>
              <li>What "positioned to be used" looks like (Axis 4 definition)</li>
            </ul>
            <p className="text-stone-600 leading-relaxed">The key constraint: <strong>small enough to complete within the capabilities of a single focused session.</strong> This isn't about quarterly goals—it's about the smallest achievable useful unit.</p>

            <h3 className="text-base font-medium text-stone-700 mt-5 mb-2">Reflect Mode (After)</h3>
            <p className="text-stone-500 italic">"What did I bring into reality? Which axes did I move along?"</p>
            <p className="text-stone-600 leading-relaxed">After the work, observe:</p>
            <ul className="text-stone-600 space-y-1">
              <li>What now exists that didn't before?</li>
              <li>Which dimensions did you actually travel?</li>
              <li>What remains unpolished?</li>
            </ul>
            <p className="text-stone-600 leading-relaxed">This transforms end-of-day self-assessment from an emotional judgement ("was I productive?") into a factual observation ("I moved along Axes 1 and 3 today; Axis 4 wasn't the focus").</p>

            <hr className="my-6 border-stone-200" />

            <h2 className="text-lg font-serif text-stone-800 mt-6 mb-3">Summary</h2>
            <p className="text-stone-600 leading-relaxed"><strong>The shift:</strong> From reservoir thinking to flow thinking. From "Did I ship?" to "What did I bring into reality? Which axes did I move along?"</p>

            <p className="text-stone-600 leading-relaxed"><strong>The physics:</strong></p>
            <ul className="text-stone-600 space-y-1">
              <li><strong>Flux</strong> = observed rate of useful work (the outcome)</li>
              <li><strong>Impedance</strong> = resistance to flow (what you design against)</li>
              <li><strong>Capacitance</strong> = stored context that can discharge (your accumulated potential)</li>
              <li><strong>Inductance</strong> = resistance to changing direction (what slows adaptation)</li>
            </ul>

            <p className="text-stone-600 leading-relaxed"><strong>The framework:</strong> Four axes of useful work</p>
            <ol className="text-stone-600 space-y-1">
              <li><strong>Existence</strong> — Did current flow? Does it now exist?</li>
              <li><strong>Recipient</strong> — Flow topology. Useful for whom or what?</li>
              <li><strong>Purpose</strong> — Work done. Useful for what?</li>
              <li><strong>Elegance</strong> — Impedance reduction. Is it positioned to be used?</li>
            </ol>

            <p className="text-stone-600 leading-relaxed"><strong>The ritual:</strong> Plan before (design channels), reflect after (observe flow)</p>

            <p className="text-stone-600 leading-relaxed"><strong>The principle:</strong> Don't push flux through high-impedance systems. Reduce impedance so flux becomes natural. Accomplishment is movement along any axis. The finish line is a fiction from reservoir thinking. Usefulness is the measure.</p>

            <hr className="my-6 border-stone-200" />

            <p className="text-stone-500 italic text-center mt-6">"Intelligence flows to the point of need.<br/>Design the channels. Reduce the resistance. Let it flow."</p>
          </div>
        </div>

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-stone-400 hover:text-stone-600 hover:bg-stone-100 rounded-lg transition-colors"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
}

// Life in Weeks Component
function LifeInWeeks({ birthDate, lifeExpectancy }) {
  const totalWeeks = lifeExpectancy * 52;
  const today = new Date();
  const birth = new Date(birthDate);
  const msPerWeek = 7 * 24 * 60 * 60 * 1000;
  const weeksLived = Math.floor((today - birth) / msPerWeek);
  const yearsLived = Math.floor(weeksLived / 52);
  const weeksRemaining = totalWeeks - weeksLived;
  const percentLived = ((weeksLived / totalWeeks) * 100).toFixed(1);

  return (
    <div className="h-screen bg-stone-50 p-3 flex flex-col overflow-hidden">
      <div className="flex-1 flex flex-col max-w-4xl mx-auto w-full">
        {/* Compact Header */}
        <header className="text-center mb-2">
          <h1 className="text-xl font-serif font-normal tracking-tight text-stone-800">
            Your Life in Weeks
          </h1>
          <p className="text-stone-400 italic text-xs">
            Each box is one week — make them count
          </p>
        </header>

        {/* Compact Stats Row */}
        <div className="flex justify-center gap-4 mb-2 text-center">
          <div>
            <span className="text-lg font-serif text-stone-800">{weeksLived.toLocaleString()}</span>
            <span className="text-[10px] text-stone-400 ml-1">lived</span>
          </div>
          <div className="text-stone-300">|</div>
          <div>
            <span className="text-lg font-serif text-stone-800">{weeksRemaining.toLocaleString()}</span>
            <span className="text-[10px] text-stone-400 ml-1">remaining</span>
          </div>
          <div className="text-stone-300">|</div>
          <div>
            <span className="text-lg font-serif text-amber-600">{percentLived}%</span>
            <span className="text-[10px] text-stone-400 ml-1">elapsed</span>
          </div>
        </div>

        {/* Legend */}
        <div className="flex justify-center gap-4 mb-2">
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-stone-800 rounded-sm"></div>
            <span className="text-[10px] text-stone-500">Lived</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-amber-500 rounded-sm"></div>
            <span className="text-[10px] text-stone-500">Now</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-stone-200 rounded-sm"></div>
            <span className="text-[10px] text-stone-500">Future</span>
          </div>
        </div>

        {/* Weeks Grid - Compact */}
        <div className="flex-1 bg-white rounded-lg p-2 border border-stone-200 shadow-sm flex flex-col justify-center items-center overflow-hidden">
          <div className="inline-flex flex-col" style={{ gap: '1px' }}>
            {/* Week number header */}
            <div className="flex items-center" style={{ gap: '1px' }}>
              <div style={{ width: '16px' }}></div>
              {[...Array(52)].map((_, i) => (
                <div
                  key={i}
                  style={{ width: '7px', height: '8px' }}
                  className="text-center text-[6px] text-stone-300 leading-none flex items-end justify-center"
                >
                  {(i + 1) % 10 === 0 ? (i + 1) : ''}
                </div>
              ))}
            </div>
            {/* Year rows */}
            {[...Array(lifeExpectancy)].map((_, year) => (
              <div key={year} className="flex items-center" style={{ gap: '1px' }}>
                <div
                  style={{ width: '16px' }}
                  className="text-[7px] text-stone-300 text-right pr-1 leading-none"
                >
                  {(year + 1) % 5 === 0 ? year + 1 : ''}
                </div>
                {[...Array(52)].map((_, week) => {
                  const weekNumber = year * 52 + week;
                  const isLived = weekNumber < weeksLived;
                  const isCurrentWeek = weekNumber === weeksLived;
                  return (
                    <div
                      key={week}
                      style={{ width: '7px', height: '7px' }}
                      className={`rounded-[1px] flex-shrink-0 ${
                        isCurrentWeek
                          ? 'bg-amber-500'
                          : isLived
                          ? 'bg-stone-700'
                          : 'bg-stone-200'
                      }`}
                      title={`Year ${year + 1}, Week ${week + 1}`}
                    />
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        {/* Compact Footer */}
        <p className="text-stone-400 italic text-[10px] text-center mt-2">
          "How we spend our days is how we spend our lives." — Annie Dillard
        </p>
      </div>
    </div>
  );
}

// Calendar Component
function CalendarView({ logs, onSelectDate }) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();
    return { daysInMonth, startingDay, year, month };
  };

  const { daysInMonth, startingDay, year, month } = getDaysInMonth(currentMonth);

  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];

  const getLogsForDate = (day) => {
    const dateKey = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return logs.filter(log => {
      const logDate = new Date(log.created_at || log.completed_at);
      const logKey = `${logDate.getFullYear()}-${String(logDate.getMonth() + 1).padStart(2, '0')}-${String(logDate.getDate()).padStart(2, '0')}`;
      return logKey === dateKey;
    });
  };

  const navigateMonth = (direction) => {
    setCurrentMonth(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + direction);
      return newDate;
    });
    setSelectedDate(null);
  };

  const handleDayClick = (day) => {
    const dateKey = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    setSelectedDate(dateKey);
  };

  const today = new Date();
  const isToday = (day) => {
    return today.getFullYear() === year && today.getMonth() === month && today.getDate() === day;
  };

  const selectedLogs = selectedDate ? logs.filter(log => {
    const logDate = new Date(log.created_at || log.completed_at);
    const logKey = `${logDate.getFullYear()}-${String(logDate.getMonth() + 1).padStart(2, '0')}-${String(logDate.getDate()).padStart(2, '0')}`;
    return logKey === selectedDate;
  }) : [];

  const getAxisTagStyle = (axisId) => {
    const styles = {
      existence: 'bg-amber-100 text-amber-800',
      recipient: 'bg-emerald-100 text-emerald-800',
      purpose: 'bg-slate-200 text-slate-700',
      elegance: 'bg-rose-100 text-rose-700'
    };
    return styles[axisId] || 'bg-gray-100 text-gray-700';
  };

  const getAxisLabel = (axisId) => {
    const labels = { existence: 'Existence', recipient: 'Recipient', purpose: 'Purpose', elegance: 'Elegance' };
    return labels[axisId];
  };

  return (
    <div className="min-h-screen bg-stone-50 p-4 sm:p-6">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-6 pb-4 border-b border-stone-200">
          <h1 className="text-3xl sm:text-4xl font-serif font-normal tracking-tight text-stone-800 mb-2">
            Work History
          </h1>
          <p className="text-stone-500 italic text-sm sm:text-base">
            Review what you've brought into reality
          </p>
        </header>

        {/* Calendar */}
        <div className="bg-white rounded-xl p-4 sm:p-6 border border-stone-200 shadow-sm mb-6">
          {/* Month Navigation */}
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => navigateMonth(-1)}
              className="p-2 hover:bg-stone-100 rounded-lg transition-colors"
            >
              <svg className="w-5 h-5 text-stone-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <h2 className="text-xl font-serif text-stone-800">
              {monthNames[month]} {year}
            </h2>
            <button
              onClick={() => navigateMonth(1)}
              className="p-2 hover:bg-stone-100 rounded-lg transition-colors"
            >
              <svg className="w-5 h-5 text-stone-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Day Headers */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="text-center text-xs font-medium text-stone-500 py-2">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-1">
            {[...Array(startingDay)].map((_, i) => (
              <div key={`empty-${i}`} className="aspect-square"></div>
            ))}
            {[...Array(daysInMonth)].map((_, i) => {
              const day = i + 1;
              const dayLogs = getLogsForDate(day);
              const hasLogs = dayLogs.length > 0;
              const dateKey = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
              const isSelected = selectedDate === dateKey;

              return (
                <button
                  key={day}
                  onClick={() => handleDayClick(day)}
                  className={`aspect-square rounded-lg border transition-all flex flex-col items-center justify-center relative ${
                    isSelected
                      ? 'border-amber-500 bg-amber-50 ring-2 ring-amber-200'
                      : isToday(day)
                      ? 'border-stone-400 bg-stone-100'
                      : hasLogs
                      ? 'border-emerald-300 bg-emerald-50 hover:bg-emerald-100'
                      : 'border-stone-200 hover:bg-stone-50'
                  }`}
                >
                  <span className={`text-sm ${isToday(day) ? 'font-bold text-stone-800' : 'text-stone-600'}`}>
                    {day}
                  </span>
                  {hasLogs && (
                    <div className="absolute bottom-1 flex gap-0.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                      {dayLogs.length > 1 && (
                        <span className="text-[8px] text-emerald-600 font-medium">{dayLogs.length}</span>
                      )}
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Day Logs */}
        {selectedDate && (
          <div className="bg-white rounded-xl p-4 sm:p-6 border border-stone-200 shadow-sm">
            <h3 className="text-lg font-serif text-stone-800 mb-4">
              {new Date(selectedDate + 'T00:00:00').toLocaleDateString('en-AU', {
                weekday: 'long',
                day: 'numeric',
                month: 'long',
                year: 'numeric'
              })}
            </h3>

            {selectedLogs.length === 0 ? (
              <p className="text-stone-400 italic text-sm text-center py-4">
                No work logged on this day.
              </p>
            ) : (
              <div className="space-y-3">
                {selectedLogs.map((item, idx) => (
                  <div
                    key={idx}
                    className={`p-3 sm:p-4 rounded-lg border ${
                      item.completed_at ? 'bg-emerald-50 border-emerald-200' : 'bg-amber-50 border-amber-200'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <p className="text-stone-700 text-sm flex-1">{item.text}</p>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        item.completed_at ? 'bg-emerald-200 text-emerald-700' : 'bg-amber-200 text-amber-700'
                      }`}>
                        {item.completed_at ? 'Completed' : 'Planned'}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {item.axes.map((axisId) => (
                        <span
                          key={axisId}
                          className={`text-xs px-2 py-0.5 rounded-full font-medium ${getAxisTagStyle(axisId)}`}
                        >
                          {getAxisLabel(axisId)}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// Main Component
export default function UsefulWorkFramework() {
  const [view, setView] = useState('main'); // 'main', 'calendar', 'life'
  const [mode, setMode] = useState('plan');
  const [inputText, setInputText] = useState('');
  const [selectedAxes, setSelectedAxes] = useState([]);
  const [plannedItems, setPlannedItems] = useState([]);
  const [completedItems, setCompletedItems] = useState([]);
  const [showTheory, setShowTheory] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Load items from API on mount
  const loadItems = useCallback(async () => {
    try {
      setIsLoading(true);
      const items = await api.fetchItems();
      setPlannedItems(items.filter(item => item.status === 'planned'));
      setCompletedItems(items.filter(item => item.status === 'completed'));
    } catch (error) {
      console.error('Failed to load items:', error);
      // Fallback to localStorage if API fails
      const savedPlanned = localStorage.getItem('usefulWork_planned');
      const savedCompleted = localStorage.getItem('usefulWork_completed');
      if (savedPlanned) setPlannedItems(JSON.parse(savedPlanned));
      if (savedCompleted) setCompletedItems(JSON.parse(savedCompleted));
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadItems();
  }, [loadItems]);

  const today = new Date();
  const dateString = today.toLocaleDateString('en-AU', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  const axes = [
    { id: 'existence', label: 'Existence', planLabel: 'Will bring into existence', reflectLabel: 'It now exists', color: 'amber' },
    { id: 'recipient', label: 'Recipient', planLabel: 'Know who/what it\'s for', reflectLabel: 'Clear who/what it\'s for', color: 'emerald' },
    { id: 'purpose', label: 'Purpose', planLabel: 'Define what it does', reflectLabel: 'Defined what it does', color: 'slate' },
    { id: 'elegance', label: 'Elegance', planLabel: 'Position it to be used', reflectLabel: 'Positioned to be used', color: 'rose' }
  ];

  const axisCards = [
    {
      number: 'Axis One',
      title: 'Existence',
      question: '"Did I bring something into reality?"',
      planQuestion: '"What will I bring into reality?"',
      examples: ['Created', 'Built', 'Wrote', 'Designed'],
      borderColor: 'border-t-amber-600',
      numberColor: 'text-amber-600'
    },
    {
      number: 'Axis Two',
      title: 'Recipient',
      question: '"Useful for whom or what?"',
      planQuestion: '"Who or what will this serve?"',
      examples: ['Myself', 'A user', 'A system', 'Future state'],
      borderColor: 'border-t-emerald-600',
      numberColor: 'text-emerald-600'
    },
    {
      number: 'Axis Three',
      title: 'Purpose',
      question: '"Useful for what?"',
      planQuestion: '"What problem will this solve?"',
      examples: ['Solves a problem', 'Removes friction', 'Enables capability', 'Creates clarity'],
      borderColor: 'border-t-slate-500',
      numberColor: 'text-slate-500'
    },
    {
      number: 'Axis Four',
      title: 'Deployment Elegance',
      question: '"Is it positioned to be used?"',
      planQuestion: '"How will I make it usable?"',
      examples: ['Right location', 'Atomised', 'Documented', 'Integrated'],
      borderColor: 'border-t-rose-400',
      numberColor: 'text-rose-400'
    }
  ];

  const toggleAxis = (axisId) => {
    setSelectedAxes(prev =>
      prev.includes(axisId)
        ? prev.filter(a => a !== axisId)
        : [...prev, axisId]
    );
  };

  const addItem = async () => {
    if (!inputText.trim()) return;

    const axesToAdd = selectedAxes.length > 0 ? selectedAxes : ['existence'];
    const status = mode === 'plan' ? 'planned' : 'completed';

    try {
      const newItem = await api.createItem({
        text: inputText,
        axes: axesToAdd,
        status
      });

      if (status === 'planned') {
        setPlannedItems(prev => [newItem, ...prev]);
      } else {
        setCompletedItems(prev => [newItem, ...prev]);
      }

      setInputText('');
      setSelectedAxes([]);
    } catch (error) {
      console.error('Failed to add item:', error);
    }
  };

  const completeItem = async (item) => {
    try {
      const updated = await api.updateItem(item.id, { status: 'completed' });
      setPlannedItems(prev => prev.filter(p => p.id !== item.id));
      setCompletedItems(prev => [updated, ...prev]);
    } catch (error) {
      console.error('Failed to complete item:', error);
    }
  };

  const removeItem = async (itemId, fromPlanned = true) => {
    try {
      await api.deleteItem(itemId);
      if (fromPlanned) {
        setPlannedItems(prev => prev.filter(p => p.id !== itemId));
      } else {
        setCompletedItems(prev => prev.filter(c => c.id !== itemId));
      }
    } catch (error) {
      console.error('Failed to remove item:', error);
    }
  };

  const getAxisTagStyle = (axisId) => {
    const styles = {
      existence: 'bg-amber-100 text-amber-800',
      recipient: 'bg-emerald-100 text-emerald-800',
      purpose: 'bg-slate-200 text-slate-700',
      elegance: 'bg-rose-100 text-rose-700'
    };
    return styles[axisId] || 'bg-gray-100 text-gray-700';
  };

  const getAxisLabel = (axisId) => {
    const labels = {
      existence: 'Existence',
      recipient: 'Recipient',
      purpose: 'Purpose',
      elegance: 'Elegance'
    };
    return labels[axisId];
  };

  const modeConfig = {
    plan: {
      title: 'Plan',
      sectionTitle: 'What to Bring Into Reality',
      inputLabel: 'What small useful thing could you bring into reality?',
      inputPlaceholder: 'Describe something achievable, useful, and small enough to complete...',
      axisLabel: 'Which axes will you move along?',
      buttonText: 'Add to Plan',
      listTitle: 'Planned',
      emptyState: 'Nothing planned. What small thing could move you forward?',
      philosophy: 'Before you begin, define the work. What\'s the smallest useful thing you can bring into reality? Which dimensions matter most right now?'
    },
    reflect: {
      title: 'Reflect',
      sectionTitle: 'What You Brought Into Reality',
      inputLabel: 'What did you bring into reality?',
      inputPlaceholder: 'Describe what you created, built, or made...',
      axisLabel: 'Which axes did you move along?',
      buttonText: 'Add Creation',
      listTitle: 'Completed',
      emptyState: 'Nothing yet. What will you bring into reality?',
      philosophy: 'After the work, observe the movement. Which axes did you travel? Accomplishment becomes visible when you name where you\'ve been.'
    }
  };

  const config = modeConfig[mode];

  // Navigation Component - Vertical sidebar on right
  const Navigation = () => (
    <div className="fixed top-4 right-4 z-50">
      <div className="flex flex-col bg-white rounded-2xl p-1.5 border border-stone-200 shadow-lg gap-1">
        {/* UI Mode Button */}
        <button
          onClick={() => setView('main')}
          className={`p-2.5 rounded-xl transition-all flex items-center justify-center ${
            view === 'main'
              ? 'bg-stone-800 text-white shadow-sm'
              : 'text-stone-500 hover:text-stone-700 hover:bg-stone-50'
          }`}
          title="UI Mode"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
        </button>

        {/* CUI Mode Button */}
        <button
          onClick={() => setView('chat')}
          className={`p-2.5 rounded-xl transition-all flex items-center justify-center ${
            view === 'chat'
              ? 'bg-stone-800 text-white shadow-sm'
              : 'text-stone-500 hover:text-stone-700 hover:bg-stone-50'
          }`}
          title="Chat Mode"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        </button>

        {/* Divider */}
        <div className="h-px bg-stone-200 my-1"></div>

        <button
          onClick={() => setView('calendar')}
          className={`p-2.5 rounded-xl transition-all flex items-center justify-center ${
            view === 'calendar'
              ? 'bg-stone-800 text-white shadow-sm'
              : 'text-stone-500 hover:text-stone-700 hover:bg-stone-50'
          }`}
          title="Calendar"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </button>
        <button
          onClick={() => setView('life')}
          className={`p-2.5 rounded-xl transition-all flex items-center justify-center ${
            view === 'life'
              ? 'bg-stone-800 text-white shadow-sm'
              : 'text-stone-500 hover:text-stone-700 hover:bg-stone-50'
          }`}
          title="Life in Weeks"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
          </svg>
        </button>

        {/* Divider */}
        <div className="h-px bg-stone-200 my-1"></div>

        {/* Theory button */}
        <button
          onClick={() => setShowTheory(true)}
          className="p-2.5 rounded-xl transition-all flex items-center justify-center text-stone-500 hover:text-stone-700 hover:bg-stone-50"
          title="The Theory"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        </button>
      </div>
    </div>
  );

  // Render based on view
  if (view === 'life') {
    return (
      <>
        <LifeInWeeks birthDate="1990-05-07" lifeExpectancy={80} />
        <Navigation />
        <TheoryModal isOpen={showTheory} onClose={() => setShowTheory(false)} />
      </>
    );
  }

  if (view === 'chat') {
    return (
      <>
        <ChatView onItemsChange={loadItems} />
        <Navigation />
        <TheoryModal isOpen={showTheory} onClose={() => setShowTheory(false)} />
      </>
    );
  }

  if (view === 'calendar') {
    const allLogs = [...plannedItems, ...completedItems];
    return (
      <>
        <CalendarView logs={allLogs} />
        <Navigation />
        <TheoryModal isOpen={showTheory} onClose={() => setShowTheory(false)} />
      </>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-stone-50 p-4 sm:p-6 font-sans">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <header className="text-center mb-6 pb-4 border-b border-stone-200">
            <h1 className="text-3xl sm:text-4xl font-serif font-normal tracking-tight text-stone-800 mb-2">
              Useful Work
            </h1>
            <p className="text-stone-500 italic text-sm sm:text-base">
              A framework for measuring meaningful progress
            </p>
          </header>

          {/* Mode Toggle */}
          <div className="flex justify-center mb-6">
            <div className="inline-flex bg-white rounded-xl p-1.5 border border-stone-200 shadow-sm">
              <button
                onClick={() => setMode('plan')}
                className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  mode === 'plan'
                    ? 'bg-stone-800 text-white shadow-sm'
                    : 'text-stone-500 hover:text-stone-700 hover:bg-stone-50'
                }`}
              >
                <span className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  Plan
                </span>
              </button>
              <button
                onClick={() => setMode('reflect')}
                className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  mode === 'reflect'
                    ? 'bg-stone-800 text-white shadow-sm'
                    : 'text-stone-500 hover:text-stone-700 hover:bg-stone-50'
                }`}
              >
                <span className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  Reflect
                </span>
              </button>
            </div>
          </div>

          {/* Philosophy - changes based on mode */}
          <div className="max-w-2xl mx-auto mb-6 p-4 sm:p-5 bg-white rounded-xl border border-stone-200 shadow-sm">
            <p className="text-stone-600 leading-relaxed text-sm">
              <strong className="text-stone-800">
                {mode === 'plan' ? 'Before: ' : 'After: '}
              </strong>
              {config.philosophy}
            </p>
          </div>

          {/* Axes Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-6">
            {axisCards.map((axis, index) => (
              <div
                key={index}
                className={`bg-white rounded-xl p-4 sm:p-5 border border-stone-200 shadow-sm hover:shadow-md transition-all duration-200 border-t-4 ${axis.borderColor}`}
              >
                <div className={`text-xs uppercase tracking-widest mb-1 font-medium ${axis.numberColor}`}>
                  {axis.number}
                </div>
                <h2 className="text-lg sm:text-xl font-serif text-stone-800 mb-1">
                  {axis.title}
                </h2>
                <p className="text-stone-500 italic text-sm mb-3">
                  {mode === 'plan' ? axis.planQuestion : axis.question}
                </p>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {axis.examples.map((example, i) => (
                    <span
                      key={i}
                      className="text-xs px-2.5 py-1 bg-stone-100 text-stone-500 rounded-full border border-stone-200"
                    >
                      {example}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Main Input Section */}
          <div className="bg-white rounded-xl p-4 sm:p-6 border border-stone-200 shadow-sm mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-5">
              <h2 className="text-lg sm:text-xl font-serif text-stone-800">{config.sectionTitle}</h2>
              <span className="text-sm text-stone-400">{dateString}</span>
            </div>

            {/* Input */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-stone-600 mb-2">
                {config.inputLabel}
              </label>
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addItem()}
                placeholder={config.inputPlaceholder}
                className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-lg text-stone-800 placeholder-stone-400 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-100 transition-all text-sm sm:text-base"
              />
            </div>

            {/* Axis Checkboxes */}
            <div className="mb-5">
              <label className="block text-sm font-medium text-stone-600 mb-2">
                {config.axisLabel}
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {axes.map((axis) => (
                  <button
                    key={axis.id}
                    onClick={() => toggleAxis(axis.id)}
                    className={`flex items-center gap-3 px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border transition-all text-left ${
                      selectedAxes.includes(axis.id)
                        ? 'border-amber-500 bg-amber-50'
                        : 'border-stone-200 bg-stone-50 hover:bg-stone-100'
                    }`}
                  >
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                      selectedAxes.includes(axis.id)
                        ? 'border-amber-500 bg-amber-500'
                        : 'border-stone-300'
                    }`}>
                      {selectedAxes.includes(axis.id) && (
                        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      )}
                    </div>
                    <span className={`text-xs sm:text-sm ${selectedAxes.includes(axis.id) ? 'text-stone-800' : 'text-stone-500'}`}>
                      {mode === 'plan' ? axis.planLabel : axis.reflectLabel}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Add Button */}
            <button
              onClick={addItem}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-stone-800 text-stone-50 rounded-lg font-medium text-sm hover:bg-stone-700 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
              {config.buttonText}
            </button>
          </div>

          {/* Lists Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            {/* Planned Items */}
            <div className="bg-white rounded-xl p-4 sm:p-5 border border-stone-200 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2 h-2 rounded-full bg-amber-500"></div>
                <h3 className="text-sm font-medium text-stone-600">
                  Planned ({plannedItems.length})
                </h3>
              </div>

              {plannedItems.length === 0 ? (
                <div className="text-center py-6 text-stone-400 italic text-sm">
                  {modeConfig.plan.emptyState}
                </div>
              ) : (
                <div className="space-y-2.5">
                  {plannedItems.map((item) => (
                    <div
                      key={item.id}
                      className="p-3 sm:p-4 bg-amber-50 rounded-lg border border-amber-200 group"
                    >
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <p className="text-stone-700 text-sm flex-1">{item.text}</p>
                        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => completeItem(item)}
                            className="p-1.5 text-emerald-600 hover:bg-emerald-100 rounded transition-colors"
                            title="Mark complete"
                          >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                          </button>
                          <button
                            onClick={() => removeItem(item.id, true)}
                            className="p-1.5 text-stone-400 hover:bg-stone-100 rounded transition-colors"
                            title="Remove"
                          >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {item.axes.map((axisId) => (
                          <span
                            key={axisId}
                            className={`text-xs px-2 py-0.5 rounded-full font-medium ${getAxisTagStyle(axisId)}`}
                          >
                            {getAxisLabel(axisId)}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Completed Items */}
            <div className="bg-white rounded-xl p-4 sm:p-5 border border-stone-200 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                <h3 className="text-sm font-medium text-stone-600">
                  Brought Into Reality ({completedItems.length})
                </h3>
              </div>

              {completedItems.length === 0 ? (
                <div className="text-center py-6 text-stone-400 italic text-sm">
                  {modeConfig.reflect.emptyState}
                </div>
              ) : (
                <div className="space-y-2.5">
                  {completedItems.map((item) => (
                    <div
                      key={item.id}
                      className="p-3 sm:p-4 bg-emerald-50 rounded-lg border border-emerald-200 group"
                    >
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <p className="text-stone-700 text-sm flex-1">{item.text}</p>
                        <button
                          onClick={() => removeItem(item.id, false)}
                          className="p-1.5 text-stone-400 hover:bg-stone-100 rounded transition-colors opacity-0 group-hover:opacity-100"
                          title="Remove"
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {item.axes.map((axisId) => (
                          <span
                            key={axisId}
                            className={`text-xs px-2 py-0.5 rounded-full font-medium ${getAxisTagStyle(axisId)}`}
                          >
                            {getAxisLabel(axisId)}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Footer */}
          <footer className="text-center pt-6 mt-6 border-t border-stone-200">
            <p className="text-stone-500 italic font-serif text-sm sm:text-base max-w-lg mx-auto">
              "The satisfaction of good work comes from movement along any axis—not crossing a finish line that doesn't exist."
            </p>
          </footer>
        </div>
      </div>
      <Navigation />
      <TheoryModal isOpen={showTheory} onClose={() => setShowTheory(false)} />
    </>
  );
}
