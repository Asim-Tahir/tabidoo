// export interface ITodoProxy {
//   username: string | null;
//   storekey: string;
//   todos: Array<Todo>;
// }

interface Todo {
  id: number;
  text: string;
  created_at: number;
  updated_at: number;
}

// export default class TodoController<K, V extends Array<V>> extends Map<K, V> {
//   clear(): void {
//     throw new Error("Method not implemented.");
//   }
//   delete(key: K): boolean {
//     throw new Error("Method not implemented.");
//   }
//   forEach(
//     callbackfn: (value: V, key: K, map: Map<K, V>) => void,
//     thisArg?: any
//   ): void {
//     throw new Error("Method not implemented.");
//   }
//   get(key: K): V | undefined {
//     throw new Error("Method not implemented.");
//   }
//   has(key: K): boolean {
//     throw new Error("Method not implemented.");
//   }
//   set(key: K, value: V): this {
//     throw new Error("Method not implemented.");
//   }
//   size: number;
//   entries(): IterableIterator<[K, V]> {
//     throw new Error("Method not implemented.");
//   }
//   keys(): IterableIterator<K> {
//     throw new Error("Method not implemented.");
//   }
//   values(): IterableIterator<V> {
//     throw new Error("Method not implemented.");
//   }
//   [Symbol.iterator](): IterableIterator<[K, V]> {
//     throw new Error("Method not implemented.");
//   }
//   [Symbol.toStringTag]: string;
// }

export default new Proxy<Map<string, Array<Todo>>>(
  new Map<string, Array<Todo>>(),
  {
    get(
      target: Map<string, Array<Todo>>,
      prop: keyof Map<string, Array<Todo>>
    ) {
      console.log(target);

      switch (prop) {
        case "get":
          const func = target[prop];

          return function (...args: [username: string]) {
            const username = args[0];

            if (!/[\w ]+/i.test(username)) {
              throw new Error("`username` is invalid");
            }

            const storekey = `tabidoo_${username}_todos`;

            /**
             *------------------------------------------------------------------
             * Cache check
             *------------------------------------------------------------------
             *
             */
            if (target.has(username)) {
              /**
               *----------------------------------------------------------------
               * Hit cache
               *----------------------------------------------------------------
               *
               */
              return func.apply(target, args);
            } else {
              /**
               *----------------------------------------------------------------
               * Miss cache
               *----------------------------------------------------------------
               *
               */
              target.set(username, []);

              /**
               *----------------------------------------------------------------
               * Local storage check
               *----------------------------------------------------------------
               *
               */
              if (localStorage.getItem(storekey)) {
                /**
                 *--------------------------------------------------------------
                 * Hit local storage
                 *--------------------------------------------------------------
                 *
                 */
                let todos: Array<Todo>;

                try {
                  todos = JSON.parse(localStorage.getItem(storekey)!);
                  target.set(username, todos);
                } catch (err) {}

                target.set(username, todos!);
                return localStorage.getItem(storekey);
              } else {
                /**
                 *--------------------------------------------------------------
                 * Miss storage
                 *--------------------------------------------------------------
                 *
                 */
                localStorage.setItem(storekey, JSON.stringify([]));
              }
            }

            return func.apply(target, args);
          };

        case "set":
          // const func = target[prop];

          // return function (...args: [username: string, todos: Array<Todo>]) {
          //   const username = args[0];
          //   const todos = args[1];

          //   func.apply(target, todos);
          // };
          break;

        case "append":
          break;

        //   case "has":
        //     break;

        //   case "clear":
        //     break;

        // case "delete":
        //   break;

        // case "size":
        //   break;

        // case "values":
        //   break;
      }
    },
    // set(target, prop, value) {},
  }
  // {
  //   username: null,
  //   get storekey() {
  //     if (!this.username) {
  //       throw new Error(
  //         `\`todos\` cannot be accessed without defining the \`username\` property`
  //       );
  //     }

  //     return `tabidoo_${this.username}_todos`;
  //   },
  //   todos: new Array<Todo>(),
  // },
  // {
  //   get(target: ITodoProxy, prop: keyof ITodoProxy) {
  //     switch (prop) {
  //       case "todos":
  //         if (!target["username"]) {
  //           throw new Error(
  //             `\`todos\` cannot be accessed without defining the \`username\` property`
  //           );
  //         }

  //         if (localStorage.getItem(target["storekey"])) {
  //           return localStorage.getItem(target["storekey"]);
  //         }

  //         localStorage.setItem(target["storekey"], JSON.stringify([]));
  //         return localStorage.getItem(target["storekey"]);

  //       default:
  //         return target[prop];
  //     }
  //   },
  //   set<P extends keyof ITodoProxy = keyof ITodoProxy>(
  //     target: ITodoProxy,
  //     prop: P,
  //     value: P extends "username" ? string : Todo
  //   ) {
  //     switch (prop) {
  //       case "username":
  //         if (typeof value === "string") {
  //           target[prop] = value;
  //         }
  //         return true;

  //       case "todos":
  //         target[prop];

  //       default:
  //         return false;
  //       // throw new Error(
  //       //   `'${prop}' property only changeable by username property`
  //       // );
  //     }
  //   },
  // }
);
