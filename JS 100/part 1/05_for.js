var a = 10;
var b = 2;

for (var i = 1; i < 5; i += 2) {
    a += i;
    // a = a + i;
    //   = 10 + 1; 11
    //   = 11 + 3; 14
}

console.log(a + b);   // 14+2