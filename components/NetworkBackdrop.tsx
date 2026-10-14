/** Fundo decorativo: rede de nós e linhas (tecnologia, dados, conectividade). */
const nodes: Array<[number, number]> = [
  [80, 120], [240, 60], [380, 180], [540, 90], [700, 200], [860, 80], [1020, 170], [1140, 70],
  [140, 320], [310, 380], [470, 300], [640, 400], [800, 330], [960, 420], [1100, 330],
  [60, 560], [220, 620], [400, 540], [580, 640], [760, 560], [930, 650], [1090, 580],
];
const links: Array<[number, number]> = [
  [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [0, 8], [2, 10], [4, 12], [6, 14],
  [8, 9], [9, 10], [10, 11], [11, 12], [12, 13], [13, 14], [8, 15], [9, 17], [11, 18],
  [13, 20], [14, 21], [15, 16], [16, 17], [17, 18], [18, 19], [19, 20], [20, 21], [3, 10], [12, 19],
];

export function NetworkBackdrop({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 1200 700"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      focusable="false"
    >
      <g stroke="currentColor" strokeWidth="1" opacity="0.35">
        {links.map(([a, b], i) => (
          <line key={i} x1={nodes[a][0]} y1={nodes[a][1]} x2={nodes[b][0]} y2={nodes[b][1]} />
        ))}
      </g>
      <g fill="currentColor">
        {nodes.map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r={i % 5 === 0 ? 4 : 2.5} opacity={i % 5 === 0 ? 0.9 : 0.55} />
        ))}
      </g>
    </svg>
  );
}
