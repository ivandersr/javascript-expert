// A estrutura Proxy permite criar Observers, a fim de disparar eventos
// quando a aplicação sofre alterações de contexto.
'use strict';

const Event = require('events');

const event = new Event();
const eventName = 'counter';

event.on(eventName, msg => console.log('counter updated', msg));

// event.emit(eventName, 'oi');

const myCounter = {
  counter: 0,
};

// No proxy, tomamos como primeiro argumento qual objeto será observado, 
// passando posteriormente um objeto contento o "set". Toda vez que um valor for
// passado para este objeto, o comportamento será interceptado pela função
// aqui definida
// Neste caso, o "eventName" será emitido, passando o novo valor que foi 
// definido ao objeto, qual a chave e, após isso, o set continua com seu 
// comportamento padrão (substituir o valor de target pelo novo valor)

const proxy = new Proxy(myCounter, {
  set: (target, propertyKey, newValue) => {
    event.emit(eventName, { newValue, key: target[propertyKey] });
    target[propertyKey] = newValue;
    return true;
  },
  get: (object, prop) => {
    // console.log('chamou', { object: prop });
    return object[prop];
  }
});

// devemos utilizar "function" para que o contexto seja local (this)
setInterval(function () {
  console.log('[3]: setInterval');
  proxy.counter++;
  if (proxy.counter === 10) clearInterval(this);
}, 200);

// Pode-se atribuir um setTimeout em 0 para que
// a execução seja prioritária de forma assíncrona (também é uma má prática)
// O nextTick ainda tem prioridade sobre esta forma
// setTimeout(() => {
//   proxy.counter = 4;
// }, 0);

setTimeout(() => {
  console.log('[2]: setTimeout')
  proxy.counter = 4;
}, 1000);

// executa exatamente agora, mas acaba com o ciclo de vida do Node
// Interrompe a pilha de execução e insere a função passada como argumento 
// no momento em que é interpretado (prioridade total, má prática)
process.nextTick(() => {
  console.log('[0]: nextTick')
  proxy.counter = 2;  // Faz o counter iniciar em 2
});

// Se algo deve ser executado imediatamente sem que o ciclo de vida do Node seja
// prejudicado, temos o setImmediate, que faz o mesmo papel do setTimeout com 
// 0 ms
setImmediate(() => {
  console.log('[1]: setImmediate', proxy.counter);
});

