const rubberProps = {
  "35": {
    E0: 1.5,
    G: 0.392,
    Ev: 2040,
    k: 0.9
  },
  "40": {
    E0: 1.5,
    G: 0.392,
    Ev: 2040,
    k: 0.9
  },
  "45": {
    E0: 1.84,
    G: 0.54,
    Ev: 2070,
    k: 0.8
  },
  "50": {
    E0: 2.24,
    G: 0.64,
    Ev: 2100,
    k: 0.73
  },
  "55": {
    E0: 3.32,
    G: 0.77,
    Ev: 2130,
    k: 0.64
  },
  "60": {
    E0: 5.54,
    G: 0.91,
    Ev: 2160,
    k: 0.57
  },
}
const trRange = {
  400: [2.0, 5.0],
  500: [2.5, 6.0],
  600: [3.0, 7.5],
  700: [3.5, 9.0],
  800: [4.0, 10.0],
  900: [4.5, 11.0],
  1000: [4.5, 11.0]
}
const getRubberProps = (g, rubberProps) => {
	if (g <= 0.46) {
    return rubberProps["40"]
  }else if(g > 0.46 && g <= 0.54) {
    return rubberProps["45"]
  }else if(g > 0.54 && g <= 0.64) {
    return rubberProps["50"]
  }else if(g > 0.64 && g <= 0.77) {
    return rubberProps["55"]
  }else{
    alert("等待管理员加入相关橡胶属性")
  }
}
const getS1 = ({Kv, Kh, g}) => {
  const { E0, G, Ev, k } = getRubberProps (g, rubberProps);
  //A1 = E0(1 + 2kS1^2)
  const A1 = 1 / (Kh / Kv / G - 1 / Ev);
  const S1 = Math.pow((A1 / E0 - 1) / (2 * k), 1 / 2);
  return S1;
}
const getTr = function ({d0, S1}) {
  return d0 / (4 * S1)
}
//获取最大n胶层厚度
const nRange = ({d0, Tr, trRange}) => {
  const range = trRange[d0];
  const [n1, n2] = trRange;
  return {
    min: Math.floor(Tr / n2),
    max: Math.ceil(Tr / n1)
  }
}
const trRange = ;
//下面开始n1,n2的反算
const calTtr = ({Tr, n}) => {
  return Tr / n
}
const calKvAndKh = ({ tr, n, d0, rubberProps: { E0, G, Ev, k }, inputKv, inputKh}) => {
  const Kv, Kh, 
  const S1 = d0 / (4 * tr);
  const A = Math.PI() * (d0 / 2) ^ 2;
  const Eap = E0 * (1 + 2 * k * S1 ^ 2);
  const Ec = Math.pow((1 / Eap + 1 / Ev), -1);
  const Kv = A * Ec / (n * tr);
  const Kh = G * A / (n * tr);
  const KvPercentage = ((Kv - inputKv) / inputKv).toFixed(2);
  const KhPercentage = (Kh -inputKh) / inputKh.toFixed(2);
  return {
    Kv,
    Kh,
    KvPercentage,
    KhPercentage
  }
}