function add8(...rest: number[]): number;
function add8(...rest: string[]): string;
function add8(...rest: any[]): any {
  let first = rest[0];
  if (typeof first === "string") {
    return rest.join(" ");
  }
  if (typeof first == "number") {
    return rest.reduce((pre, cur) => pre + cur);
  }
}
window.onkeydown = (event) => {
  // 推断event 为keyboardEvent
  console.log(event);
};

interface Obj {
  a: string;
  b: number;
  c: boolean;
}
interface obj2 {
  isTitle: boolean;
  c?: string;
  d?: number;
}
type t1<T> = T extends Obj ? Obj : obj2;
type t2 = t1<Obj | obj2>

let o1 = { isTitle: false };
let o2 = { c: "2" };
let a: t2 = o1;

let str: keyof Obj;
let aaa: Obj["a"];

type readonlyObj = Readonly<Obj>;
type partialObj = Partial<Obj>;
type pickObj = Pick<Obj, "a" | "b">;

type rec = Record<"x" | "y", Obj>;

// type t2 = Obj | obj2;



