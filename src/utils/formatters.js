export const calcularIdade = (dataNasc) => {
  if (!dataNasc) return "";
  const hoje = new Date();
  const nascimento = new Date(dataNasc);
  let idade = hoje.getFullYear() - nascimento.getFullYear();
  const m = hoje.getMonth() - nascimento.getMonth();
  if (m < 0 || (m === 0 && hoje. getDate() < nascimento.getDate())) {
    idade--;
  }
  return idade;
};

export const formatarCPF = (cpf) => {
  const numeros = cpf.replace(/\D/g, '');
  if (numeros.length <= 3) return numeros;
  if (numeros.length <= 6) return `${numeros.slice(0, 3)}.${numeros.slice(3)}`;
  if (numeros. length <= 9) return `${numeros.slice(0, 3)}.${numeros.slice(3, 6)}.${numeros.slice(6)}`;
  return `${numeros. slice(0, 3)}. ${numeros.slice(3, 6)}.${numeros. slice(6, 9)}-${numeros.slice(9, 11)}`;
};

export const calcularFC = (quadrados) => {
  if (quadrados && parseFloat(quadrados) > 0) {
    return Math.round(1500 / parseFloat(quadrados));
  }
  return null;
};

export const calcularIntervalo = (quadrados) => {
  if (quadrados && parseFloat(quadrados) > 0) {
    return Math.round(parseFloat(quadrados) * 40);
  }
  return null;
};

export const calcularQTc = (qt, fc) => {
  if (qt && fc && parseFloat(fc) > 0) {
    const qtSeg = parseFloat(qt) / 1000;
    const rrSeg = 60 / parseFloat(fc);
    const qtc = Math.round((qtSeg / Math.sqrt(rrSeg)) * 1000);
    return qtc. toString();
  }
  return '';
};

export const calcularEixo = (d1, avf) => {
  if (d1 && avf) {
    const d1Num = parseFloat(d1);
    const avfNum = parseFloat(avf);
    
    if (!isNaN(d1Num) && !isNaN(avfNum)) {
      // Fórmula: ATAN2(D1, aVF) convertido para graus
      const radianos = Math. atan2(d1Num, avfNum);
      const graus = Math.round(radianos * (180 / Math.PI));
      return graus. toString();
    }
  }
  return '';
};