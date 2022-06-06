import tw from "twin.macro";

const Loading = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      style={{ margin: "auto" }}
      width="200"
      height="200"
      display="block"
      preserveAspectRatio="xMidYMid"
      viewBox="0 0 100 100"
    >
      <g fill="#e15b64">
        <circle cx="60" cy="50" r="4">
          <animate
            attributeName="cx"
            begin="-0.67s"
            dur="1s"
            keyTimes="0;1"
            repeatCount="indefinite"
            values="95;35"
          ></animate>
          <animate
            attributeName="fill-opacity"
            begin="-0.67s"
            dur="1s"
            keyTimes="0;0.2;1"
            repeatCount="indefinite"
            values="0;1;1"
          ></animate>
        </circle>
        <circle cx="60" cy="50" r="4">
          <animate
            attributeName="cx"
            begin="-0.33s"
            dur="1s"
            keyTimes="0;1"
            repeatCount="indefinite"
            values="95;35"
          ></animate>
          <animate
            attributeName="fill-opacity"
            begin="-0.33s"
            dur="1s"
            keyTimes="0;0.2;1"
            repeatCount="indefinite"
            values="0;1;1"
          ></animate>
        </circle>
        <circle cx="60" cy="50" r="4">
          <animate
            attributeName="cx"
            begin="0s"
            dur="1s"
            keyTimes="0;1"
            repeatCount="indefinite"
            values="95;35"
          ></animate>
          <animate
            attributeName="fill-opacity"
            begin="0s"
            dur="1s"
            keyTimes="0;0.2;1"
            repeatCount="indefinite"
            values="0;1;1"
          ></animate>
        </circle>
      </g>
      <g fill="#f8b26a">
        <path d="M50 50V20a30 30 0 000 60z" transform="translate(-15)"></path>
        <path d="M50 50H20a30 30 0 0060 0z" transform="translate(-15)">
          <animateTransform
            attributeName="transform"
            dur="1s"
            keyTimes="0;0.5;1"
            repeatCount="indefinite"
            type="rotate"
            values="0 50 50;45 50 50;0 50 50"
          ></animateTransform>
        </path>
        <path d="M50 50H20a30 30 0 0160 0z" transform="translate(-15)">
          <animateTransform
            attributeName="transform"
            dur="1s"
            keyTimes="0;0.5;1"
            repeatCount="indefinite"
            type="rotate"
            values="0 50 50;-45 50 50;0 50 50"
          ></animateTransform>
        </path>
      </g>
    </svg>
  );
};

const LoadingAni = () => {
  return (
    <svg id="wrap" width={300} height={300}>
      {/* background */}
      <svg>
        <circle
          cx={150}
          cy={150}
          r={130}
          style={{ stroke: "lightblue", strokeWidth: 18, fill: "transparent" }}
        />
        <circle cx={150} cy={150} r={115} style={{ fill: "#2c3e50" }} />
        <path
          style={{
            stroke: "#2c3e50",
            strokeDasharray: 820,
            strokeDashoffset: 820,
            strokeWidth: 18,
            fill: "transparent",
          }}
          d="M150,150 m0,-130 a 130,130 0 0,1 0,260 a 130,130 0 0,1 0,-260"
        >
          <animate
            attributeName="stroke-dashoffset"
            dur="6s"
            to={-820}
            repeatCount="indefinite"
          />
        </path>
      </svg>
      {/* image */}
      <svg>
        <path
          id="hourglass"
          d="M150,150 C60,85 240,85 150,150 C60,215 240,215 150,150 Z"
          style={{ stroke: "white", strokeWidth: 5, fill: "white" }}
        />
        <path
          id="frame"
          d="M100,97 L200, 97 M100,203 L200,203 M110,97 L110,142 M110,158 L110,200 M190,97 L190,142 M190,158 L190,200 M110,150 L110,150 M190,150 L190,150"
          style={{
            stroke: "lightblue",
            strokeWidth: 6,
            strokeLinecap: "round",
          }}
        />
        <animateTransform
          xlinkHref="#frame"
          attributeName="transform"
          type="rotate"
          begin="0s"
          dur="3s"
          values="0 150 150; 0 150 150; 180 150 150"
          keyTimes="0; 0.8; 1"
          repeatCount="indefinite"
        />
        <animateTransform
          xlinkHref="#hourglass"
          attributeName="transform"
          type="rotate"
          begin="0s"
          dur="3s"
          values="0 150 150; 0 150 150; 180 150 150"
          keyTimes="0; 0.8; 1"
          repeatCount="indefinite"
        />
      </svg>
      {/* sand */}
      <svg>
        {/* upper part */}
        <polygon
          id="upper"
          points="120,125 180,125 150,147"
          style={{ fill: "#2c3e50" }}
        >
          <animate
            attributeName="points"
            dur="3s"
            keyTimes="0; 0.8; 1"
            values="120,125 180,125 150,147; 150,150 150,150 150,150; 150,150 150,150 150,150"
            repeatCount="indefinite"
          />
        </polygon>
        {/* falling sand */}
        <path
          id="line"
          strokeLinecap="round"
          strokeDasharray="1,4"
          strokeDashoffset={200.0}
          stroke="#2c3e50"
          strokeWidth={2}
          d="M150,150 L150,198"
        >
          {/* running sand */}
          <animate
            attributeName="stroke-dashoffset"
            dur="3s"
            to={1.0}
            repeatCount="indefinite"
          />
          {/* emptied upper */}
          <animate
            attributeName="d"
            dur="3s"
            to="M150,195 L150,195"
            values="M150,150 L150,198; M150,150 L150,198; M150,198 L150,198; M150,195 L150,195"
            keyTimes="0; 0.65; 0.9; 1"
            repeatCount="indefinite"
          />
          {/* last drop */}
          <animate
            attributeName="stroke"
            dur="3s"
            keyTimes="0; 0.65; 0.8; 1"
            values="#2c3e50;#2c3e50;transparent;transparent"
            to="transparent"
            repeatCount="indefinite"
          />
        </path>
        {/* lower part */}
        <g id="lower">
          <path
            d="M150,180 L180,190 A28,10 0 1,1 120,190 L150,180 Z"
            style={{ stroke: "transparent", strokeWidth: 5, fill: "#2c3e50" }}
          >
            <animateTransform
              attributeName="transform"
              type="translate"
              keyTimes="0; 0.65; 1"
              values="0 15; 0 0; 0 0"
              dur="3s"
              repeatCount="indefinite"
            />
          </path>
          <animateTransform
            xlinkHref="#lower"
            attributeName="transform"
            type="rotate"
            begin="0s"
            dur="3s"
            values="0 150 150; 0 150 150; 180 150 150"
            keyTimes="0; 0.8; 1"
            repeatCount="indefinite"
          />
        </g>
        {/* lower overlay - hourglass */}
        <path
          d="M150,150 C60,85 240,85 150,150 C60,215 240,215 150,150 Z"
          style={{ stroke: "white", strokeWidth: 5, fill: "transparent" }}
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            begin="0s"
            dur="3s"
            values="0 150 150; 0 150 150; 180 150 150"
            keyTimes="0; 0.8; 1"
            repeatCount="indefinite"
          />
        </path>
        {/* lower overlay - frame */}
        <path
          id="frame"
          d="M100,97 L200, 97 M100,203 L200,203"
          style={{
            stroke: "lightblue",
            strokeWidth: 6,
            strokeLinecap: "round",
          }}
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            begin="0s"
            dur="3s"
            values="0 150 150; 0 150 150; 180 150 150"
            keyTimes="0; 0.8; 1"
            repeatCount="indefinite"
          />
        </path>
      </svg>
    </svg>
  );
};

export default LoadingAni;
