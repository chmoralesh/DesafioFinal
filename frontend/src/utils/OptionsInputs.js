export const typeOptions = ["NO", "NC", "4-20mA", "0-10V", "1-5V"];
export const delayOptions = [
  "0",
  "100",
  "200",
  "500",
  "1000",
  "2000",
  "5000",
  "10000",
  "15000",
  "20000",
  "30000",
];
export const inhibitOptions = ["Si", "No"];
export const stateOptions = [
  "Normal",
  "Pre-alarma",
  "Alarmado No acusado",
  "Alarmado Acusado",
  "Inhibido",
  "Auto-bloqueo",
  "Desconocido",
];
export const groupsRender = [
  { id: 1, name: "Motor Principal" },
  { id: 2, name: "Caja Reductora" },
  { id: 3, name: "Sistema Electrico" },
  { id: 4, name: "Niveles de Estanques" },
  { id: 5, name: "Sentinas" },
  { id: 6, name: "Miscelaneos" },
];
export const groupsOptions = Object.values(groupsRender).map(
  (item) => item.name
);
