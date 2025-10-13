import React from "react";

// Define los colores por defecto
const defaultColors = {
  baseMontaje: "#37474f",
  cuerpoMotor: ["rgb(240,100,0)", "rgb(220,80,0)", "rgb(180,60,0)"],
  culatas: ["rgb(255,150,80)", "rgb(200,100,50)"],
  cubiertaCulatas: ["rgb(80,80,80)", "rgb(40,40,40)"],
  multipleEscape: ["rgb(180,180,180)", "rgb(120,120,120)", "rgb(80,80,80)"],
  cajaControl: ["rgb(255,220,0)", "rgb(200,180,0)"],
  radiador: "#4caf50",
  tuberias: ["rgb(200,100,50)", "rgb(150,70,30)"],
  cables: "#a327d4",
  turboCarcasa: ["rgb(180,180,180)", "rgb(120,120,120)", "rgb(80,80,80)"],
  turbina: "#212121",
  admision: ["rgb(80,80,80)", "rgb(40,40,40)"],
  inyectores: "#424242",
  panelDisplay: "#37474f",
  boton: "#78909c",
  volanteInercia: ["rgb(80,80,80)", "rgb(40,40,40)"],
  ventilador: ["rgb(180,180,180)", "rgb(120,120,120)", "rgb(80,80,80)"],
  poleasEngranajes: "#616161",
  bomba: "#424242",
  filtro: ["rgb(180,180,180)", "rgb(120,120,120)", "rgb(80,80,80)"],
  indicatorLight: "#ff0000",
  lineDetail: "#333",
  textLabel: "#eee",
  statusText: "OK",
};

const MotorDieselSVG = ({ colors: customColors = {}, ...props }) => {
  // Fusionar colores por defecto con personalizados
  const colors = { ...defaultColors, ...customColors };

  // Desestructurar arrays de colores para mayor claridad
  const [cuerpoMotor1, cuerpoMotor2, cuerpoMotor3] = colors.cuerpoMotor;
  const [culatas1, culatas2] = colors.culatas;
  const [cubiertaCulatas1, cubiertaCulatas2] = colors.cubiertaCulatas;
  const [multipleEscape1, multipleEscape2, multipleEscape3] =
    colors.multipleEscape;
  const [cajaControl1, cajaControl2] = colors.cajaControl;
  const [tuberias1, tuberias2] = colors.tuberias;
  const [turboCarcasa1, turboCarcasa2, turboCarcasa3] = colors.turboCarcasa;
  const [admision1, admision2] = colors.admision;
  const [volanteInercia1, volanteInercia2] = colors.volanteInercia;
  const [ventilador1, ventilador2, ventilador3] = colors.ventilador;
  const [filtro1, filtro2, filtro3] = colors.filtro;

  return (
    // <svg
    //   width="1200"
    //   height="800"
    //   viewBox="0 0 1200 800"
    //   xmlns="http://www.w3.org/2000/svg"
    //   {...props}
    // >
    <svg
      viewBox="0 0 1200 800"
      preserveAspectRatio="xMidYMid meet"
      style={{
        width: "100%",
        height: "auto",
        display: "block",
      }}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <title>Motor Diesel Marino Industrial Detallado</title>
      <desc>
        Un diagrama SVG de un motor de barco con detalles industriales,
        sombreado y texturas.
      </desc>

      <defs>
        {/* Gradientes */}
        <linearGradient id="mainBodyGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={cuerpoMotor1} />
          <stop offset="50%" stopColor={cuerpoMotor2} />
          <stop offset="100%" stopColor={cuerpoMotor3} />
        </linearGradient>

        <linearGradient id="headGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={culatas1} />
          <stop offset="100%" stopColor={culatas2} />
        </linearGradient>

        <linearGradient id="metalGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={multipleEscape1} />
          <stop offset="50%" stopColor={multipleEscape2} />
          <stop offset="100%" stopColor={multipleEscape3} />
        </linearGradient>

        <linearGradient
          id="darkMetalGradient"
          x1="0%"
          y1="0%"
          x2="0%"
          y2="100%"
        >
          <stop offset="0%" stopColor={cubiertaCulatas1} />
          <stop offset="100%" stopColor={cubiertaCulatas2} />
        </linearGradient>

        <linearGradient id="copperGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={tuberias1} />
          <stop offset="100%" stopColor={tuberias2} />
        </linearGradient>

        <linearGradient id="panelGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={cajaControl1} />
          <stop offset="100%" stopColor={cajaControl2} />
        </linearGradient>

        <linearGradient id="turboGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={turboCarcasa1} />
          <stop offset="50%" stopColor={turboCarcasa2} />
          <stop offset="100%" stopColor={turboCarcasa3} />
        </linearGradient>

        <linearGradient id="admisionGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={admision1} />
          <stop offset="100%" stopColor={admision2} />
        </linearGradient>

        <linearGradient id="volanteGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={volanteInercia1} />
          <stop offset="100%" stopColor={volanteInercia2} />
        </linearGradient>

        <linearGradient
          id="ventiladorGradient"
          x1="0%"
          y1="0%"
          x2="0%"
          y2="100%"
        >
          <stop offset="0%" stopColor={ventilador1} />
          <stop offset="50%" stopColor={ventilador2} />
          <stop offset="100%" stopColor={ventilador3} />
        </linearGradient>

        <linearGradient id="filtroGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={filtro1} />
          <stop offset="50%" stopColor={filtro2} />
          <stop offset="100%" stopColor={filtro3} />
        </linearGradient>

        {/* Patrones */}
        <pattern
          id="fineGrid"
          width="6"
          height="6"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M 6 0 L 0 0 L 0 6"
            fill="none"
            stroke="#666"
            strokeWidth="0.5"
          />
        </pattern>

        <pattern
          id="ventGrid"
          width="8"
          height="8"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M 8 0 L 0 0 L 0 8"
            fill="none"
            stroke="#aaa"
            strokeWidth="1"
          />
        </pattern>

        {/* Filtros */}
        <filter id="hardShadow">
          <feDropShadow
            dx="3"
            dy="3"
            stdDeviation="3"
            floodColor="#000"
            floodOpacity="0.4"
          />
        </filter>

        <filter id="softShadow">
          <feDropShadow
            dx="2"
            dy="2"
            stdDeviation="2"
            floodColor="#000"
            floodOpacity="0.2"
          />
        </filter>

        <filter id="inset">
          <feOffset dx="1" dy="1" />
          <feGaussianBlur stdDeviation="1" result="offset-blur" />
          <feComposite
            operator="out"
            in="SourceGraphic"
            in2="offset-blur"
            result="inverse"
          />
          <feFlood floodColor="black" floodOpacity="0.6" result="shadow" />
          <feComposite operator="in" in="shadow" in2="inverse" />
          <feComposite operator="over" in="SourceGraphic" />
        </filter>
      </defs>

      {/* Base del montaje */}
      <rect
        fill={colors.baseMontaje}
        stroke="#263238"
        x="60"
        y="600"
        width="1080"
        height="50"
        rx="10"
        filter="url(#hardShadow)"
      />

      {/* Cuerpo principal del motor */}
      <rect
        fill="url(#mainBodyGradient)"
        stroke="#8d2a00"
        x="120"
        y="320"
        width="800"
        height="280"
        rx="15"
        filter="url(#hardShadow)"
      />

      <rect
        fill="url(#mainBodyGradient)"
        stroke="#8d2a00"
        x="110"
        y="450"
        width="20"
        height="150"
        rx="5"
      />

      <rect
        fill="url(#mainBodyGradient)"
        stroke="#8d2a00"
        x="900"
        y="450"
        width="20"
        height="150"
        rx="5"
      />

      {/* Volante de inercia */}
      <circle
        fill="url(#volanteGradient)"
        stroke="#424242"
        cx="980"
        cy="450"
        r="140"
        filter="url(#hardShadow)"
      />

      <circle fill={colors.turbina} cx="980" cy="450" r="40" />

      <rect
        fill={colors.turbina}
        x="975"
        y="310"
        width="10"
        height="100"
        rx="2"
      />

      <rect
        fill={colors.turbina}
        x="975"
        y="550"
        width="10"
        height="100"
        rx="2"
      />

      <path
        d="M 980 310 L 980 590"
        stroke={colors.lineDetail}
        strokeWidth="15"
        fill="none"
        opacity="0.6"
        strokeLinecap="round"
      />

      <path
        d="M 900 450 L 970 450"
        stroke={colors.lineDetail}
        strokeWidth="15"
        fill="none"
        opacity="0.6"
        strokeLinecap="round"
      />

      {/* Culatas e inyectores */}
      <g filter="url(#softShadow)">
        {[150, 270, 390, 510, 630, 750].map((x) => (
          <rect
            key={`culata-${x}`}
            fill="url(#headGradient)"
            stroke="#993300"
            x={x}
            y="250"
            width="100"
            height="80"
            rx="8"
          />
        ))}

        {[160, 280, 400, 520, 640, 760].map((x) => (
          <rect
            key={`cubierta-${x}`}
            fill="url(#darkMetalGradient)"
            stroke="#424242"
            x={x}
            y="260"
            width="80"
            height="60"
            rx="5"
          />
        ))}

        {[195, 315, 435, 555, 675, 795].map((x) => (
          <circle
            key={`inyector-${x}`}
            fill={colors.inyectores}
            stroke="#212121"
            cx={x}
            cy="285"
            r="6"
          />
        ))}

        {/* Cables de inyectores */}
        <path
          stroke={colors.cables}
          d="M 195 295 L 195 310 L 180 310"
          strokeWidth="2"
          fill="none"
        />
        <path
          stroke={colors.cables}
          d="M 315 295 L 315 310 L 300 310"
          strokeWidth="2"
          fill="none"
        />
        <path
          stroke={colors.cables}
          d="M 435 295 L 435 310 L 420 310"
          strokeWidth="2"
          fill="none"
        />
        <path
          stroke={colors.cables}
          d="M 555 295 L 555 310 L 540 310"
          strokeWidth="2"
          fill="none"
        />
        <path
          stroke={colors.cables}
          d="M 675 295 L 675 310 L 660 310"
          strokeWidth="2"
          fill="none"
        />
        <path
          stroke={colors.cables}
          d="M 795 295 L 795 310 L 780 310"
          strokeWidth="2"
          fill="none"
        />
      </g>

      {/* Múltiple de escape */}
      <rect
        fill="url(#metalGradient)"
        stroke="#616161"
        x="130"
        y="180"
        width="600"
        height="60"
        rx="10"
        filter="url(#softShadow)"
      />

      <rect
        fill="url(#metalGradient)"
        stroke="#616161"
        x="700"
        y="190"
        width="50"
        height="40"
        rx="5"
      />

      {[160, 280, 400, 520, 640].map((x) => (
        <circle key={`escape-${x}`} fill="#424242" cx={x} cy="210" r="10" />
      ))}

      {/* Turbocompresor */}
      <g filter="url(#hardShadow)">
        <circle
          fill="url(#turboGradient)"
          stroke="#424242"
          cx="800"
          cy="240"
          r="80"
        />

        <circle fill={colors.turbina} cx="800" cy="240" r="45" />

        <circle
          fill="url(#turboGradient)"
          stroke="#424242"
          cx="800"
          cy="380"
          r="60"
        />

        <circle fill={colors.turbina} cx="800" cy="380" r="30" />

        <path
          stroke={colors.lineDetail}
          d="M 750 200 L 750 300 M 850 200 L 850 300"
          fill="none"
          opacity="0.6"
        />

        <path
          stroke={colors.lineDetail}
          d="M 770 200 L 770 280 M 830 200 L 830 280"
          fill="none"
          opacity="0.6"
        />

        <rect
          fill="url(#turboGradient)"
          stroke="#424242"
          x="750"
          y="290"
          width="100"
          height="60"
          rx="5"
        />

        <path
          fill="url(#metalGradient)"
          stroke="#616161"
          d="M 730 210 C 740 180, 780 160, 800 160 L 870 160 C 900 160, 920 180, 920 210 L 920 250 C 920 280, 900 300, 870 300 L 800 300 C 780 300, 740 280, 730 250 Z"
          filter="url(#softShadow)"
        />
      </g>

      {/* Colector de admisión */}
      <rect
        fill="url(#admisionGradient)"
        stroke="#5d4037"
        x="130"
        y="320"
        width="700"
        height="70"
        rx="10"
        filter="url(#softShadow)"
      />

      <rect
        fill="url(#admisionGradient)"
        stroke="#5d4037"
        x="140"
        y="390"
        width="40"
        height="150"
        rx="8"
      />

      <rect
        fill="url(#admisionGradient)"
        stroke="#5d4037"
        x="780"
        y="390"
        width="40"
        height="150"
        rx="8"
      />

      <rect
        fill="url(#admisionGradient)"
        stroke="#5d4037"
        x="450"
        y="390"
        width="40"
        height="150"
        rx="8"
      />

      <path
        stroke={colors.lineDetail}
        d="M 150 390 L 150 540 M 790 390 L 790 540 M 470 390 L 470 540"
        fill="none"
        opacity="0.6"
      />

      {/* Tuberías */}
      {/* <path
        stroke="url(#copperGradient)"
        d="M 110 500 C 80 480, 80 430, 110 410 C 140 390, 150 380, 180 370"
        strokeWidth="5"
        fill="none"
        strokeLinejoin="round"
      />

      <path
        stroke="url(#copperGradient)"
        d="M 200 500 C 180 480, 180 430, 210 410 C 240 390, 250 380, 280 370"
        strokeWidth="5"
        fill="none"
        strokeLinejoin="round"
      />

      <path
        stroke="url(#copperGradient)"
        d="M 850 400 C 880 380, 880 330, 850 310 C 820 290, 810 280, 780 270"
        strokeWidth="5"
        fill="none"
        strokeLinejoin="round"
      />

      <path
        stroke="url(#copperGradient)"
        d="M 850 500 C 880 480, 880 430, 850 410 C 820 390, 810 380, 780 370"
        strokeWidth="5"
        fill="none"
        strokeLinejoin="round"
      /> */}

      {/* Bomba de aceite */}
      <rect
        fill={colors.bomba}
        stroke="#212121"
        x="130"
        y="470"
        width="80"
        height="60"
        rx="5"
        filter="url(#softShadow)"
      />

      <circle fill={colors.turbina} cx="170" cy="480" r="10" />

      <text
        x="145"
        y="510"
        fill={colors.textLabel}
        fontSize="12"
        fontFamily="'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
      >
        Oil Pump
      </text>

      {/* Filtro de combustible */}
      <rect
        fill="url(#filtroGradient)"
        stroke="#424242"
        x="230"
        y="480"
        width="60"
        height="80"
        rx="5"
        filter="url(#softShadow)"
      />

      <circle fill={colors.turbina} cx="260" cy="490" r="8" />

      <text
        x="240"
        y="540"
        fill={colors.textLabel}
        fontSize="12"
        fontFamily="'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
      >
        Fuel Filter
      </text>

      {/* Caja de control */}
      <rect
        fill="url(#panelGradient)"
        stroke="#ffab00"
        x="280"
        y="400"
        width="200"
        height="120"
        rx="10"
        filter="url(#hardShadow)"
      />

      <rect
        fill={colors.panelDisplay}
        stroke="#263238"
        x="295"
        y="415"
        width="170"
        height="40"
        rx="5"
        filter="url(#inset)"
      />

      <text x="300" y="440" fontFamily="monospace" fontSize="18" fill="#64ffda">
        STATUS: OK
      </text>

      {[330, 370, 410].map((cx, index) => (
        <circle
          key={`boton-${cx}`}
          fill={colors.boton}
          stroke="#455a64"
          cx={cx}
          cy="480"
          r="10"
        />
      ))}

      <circle
        fill={colors.indicatorLight}
        stroke="#a00"
        strokeWidth="1"
        cx="450"
        cy="425"
        r="5"
      />

      <text x="325" y="485" fontFamily="Arial" fontSize="12" fill="white">
        S
      </text>
      <text x="365" y="485" fontFamily="Arial" fontSize="12" fill="white">
        M
      </text>
      <text x="405" y="485" fontFamily="Arial" fontSize="12" fill="white">
        A
      </text>

      {/* Radiador */}
      <rect
        fill={colors.radiador}
        stroke="#2e7d32"
        x="900"
        y="320"
        width="80"
        height="200"
        rx="8"
        filter="url(#hardShadow)"
      />

      <rect
        fill={colors.radiador}
        x="905"
        y="325"
        width="70"
        height="190"
        fill="url(#ventGrid)"
      />

      <path
        stroke="url(#copperGradient)"
        d="M 900 350 C 880 350, 870 300, 870 280 C 870 260, 880 250, 900 250"
        strokeWidth="6"
        fill="none"
      />

      <path
        stroke="url(#copperGradient)"
        d="M 900 480 C 880 480, 870 530, 870 550 C 870 570, 880 580, 900 580"
        strokeWidth="6"
        fill="none"
      />

      {/* Poleas y engranajes */}
      <g filter="url(#softShadow)">
        <circle
          fill={colors.poleasEngranajes}
          stroke="#424242"
          cx="190"
          cy="550"
          r="30"
        />

        <circle fill="#424242" cx="190" cy="550" r="15" />

        <circle
          fill={colors.poleasEngranajes}
          stroke="#424242"
          cx="280"
          cy="550"
          r="25"
        />

        <circle fill="#424242" cx="280" cy="550" r="12" />

        <path
          stroke={colors.lineDetail}
          d="M 160 550 L 255 550"
          strokeWidth="10"
          fill="none"
          opacity="0.6"
        />

        <path
          stroke={colors.lineDetail}
          d="M 190 520 L 280 525"
          strokeWidth="8"
          fill="none"
          opacity="0.6"
        />

        <path
          stroke={colors.lineDetail}
          d="M 190 580 L 280 575"
          strokeWidth="8"
          fill="none"
          opacity="0.6"
        />
      </g>

      {/* Detalles de textura */}
      <rect
        x="130"
        y="330"
        width="20"
        height="40"
        fill="url(#fineGrid)"
        opacity="0.8"
      />
      <rect
        x="880"
        y="330"
        width="20"
        height="40"
        fill="url(#fineGrid)"
        opacity="0.8"
      />
    </svg>
  );
};

export default MotorDieselSVG;
