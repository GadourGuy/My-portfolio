// Illustrations for projects whose source and screenshots are not public.

function VisionArt() {
  const stations = [
    ['Station 1', 'PASS'],
    ['Station 2', 'PASS'],
    ['Station 3', 'FAIL'],
    ['Station 4', 'PASS'],
  ];
  return (
    <div className="art art-vision">
      <div className="art-bar"><i /><i /><i /><span>ABW Vision · Station 2 · Live</span></div>
      <div className="art-body">
        <div className="vision-view">
          <div className="vision-board">
            <span className="chip c1" /><span className="chip c2" /><span className="chip c3" />
            <span className="res r1" /><span className="res r2" /><span className="res r3" />
            <span className="pad p1" /><span className="pad p2" />
          </div>
          <div className="roi roi-a"><b>TEMPLATE 98.7%</b></div>
          <div className="roi roi-b"><b>BLOB OK</b></div>
          <div className="roi roi-c is-round"><b>CIRCLE r=12.4</b></div>
          <div className="vision-scan" />
        </div>
        <aside className="vision-side">
          <p className="side-title">Line status</p>
          {stations.map(([s, r]) => (
            <p key={s} className="side-row"><span>{s}</span><em className={r === 'PASS' ? 'ok' : 'ng'}>{r}</em></p>
          ))}
          <p className="side-plc"><i /> PLC · Modbus TCP</p>
        </aside>
      </div>
    </div>
  );
}

function EventArt() {
  const events = [
    ['Night Run', 'Sports', 'g1'],
    ['Hackathon', 'Tech', 'g2'],
    ['Cultural Night', 'Culture', 'g3'],
    ['Career Talk', 'Talks', 'g4'],
    ['Futsal Cup', 'Sports', 'g5'],
    ['Charity Bazaar', 'Community', 'g6'],
  ];
  return (
    <div className="art art-event">
      <div className="art-bar"><i /><i /><i /><span>razakevent · Discover</span></div>
      <div className="art-body event-body">
        <div className="event-search"><i className="fa-solid fa-magnifying-glass" /> Search college events…</div>
        <div className="event-grid">
          {events.map(([t, c, g]) => (
            <div className="event-card" key={t}>
              <div className={`event-thumb ${g}`} />
              <p className="event-cat">{c}</p>
              <p className="event-title">{t}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function ProjectArt({ kind }) {
  return kind === 'vision' ? <VisionArt /> : <EventArt />;
}
