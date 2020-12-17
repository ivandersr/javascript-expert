try {
  (function func() {
    const a = 1;
    const b = 2;
    console.log(a + b);
  })();

  func();

  console.log(a + b);
} catch (err) {
  console.log(err.message);
}