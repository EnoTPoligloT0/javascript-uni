const asyncAdd = async (a, b) => {
  if (typeof a !== 'number' || typeof b !== 'number') {
      return Promise.reject('Argumenty muszą mieć typ number!');
  }
  return new Promise(resolve => {
      setTimeout(() => resolve(a + b), 100);
  });
};

const addSlow = async (...numbers) => {
  let result = numbers[0];
  for (let i = 1; i < numbers.length; i++) {
      result = await asyncAdd(result, numbers[i]);
  }
  return result;
};

const addFast = async (...numbers) => {
  while (numbers.length > 1) {
      const promises = [];
      for (let i = 0; i < numbers.length; i += 2) {
          if (i + 1 < numbers.length) {
              promises.push(asyncAdd(numbers[i], numbers[i + 1]));
          } else {
              promises.push(numbers[i]);
          }
      }
      numbers = await Promise.all(promises);
  }
  return numbers[0];
};

const measureTime = async (fn, ...args) => {
  const start = performance.now();
  const result = await fn(...args);
  const time = performance.now() - start;
  return { result, time };
};

const test = async () => {
  const output = document.getElementById('output');
  output.innerHTML = 'Testowanie...';

  const numbers = Array.from({length: 100}, (_, i) => i + 1);
  
  const slow = await measureTime(addSlow, ...numbers);
  const fast = await measureTime(addFast, ...numbers);

  output.innerHTML = `
      <div class="result">
          <h3>Wyniki dla 100 liczb (1-100):</h3>
          <p><strong>Wersja wolna:</strong> ${slow.time.toFixed(0)}ms | Wynik: ${slow.result}</p>
          <p><strong>Wersja szybka:</strong> ${fast.time.toFixed(0)}ms | Wynik: ${fast.result}</p>
          <p><strong>Przyspieszenie:</strong> ${(slow.time / fast.time).toFixed(1)}x</p>
          <p><strong>Operacje async:</strong> 99</p>
      </div>
  `;
};

window.test = test;