/*
 * @Author: Lemon
 * @Date: 2023-05-04 17:10:12
 * @Description:
 */
import { defineStore } from 'pinia';

export const useSocket = defineStore('webSocket', {
  state: () => ({
    events: new Map(),
  }),
  actions: {
    $emit(eventName: string, data: AppSystem.TriggerResponse) {
      if (this.events.get(eventName)) {
        this.events.get(eventName).forEach(function (fn: Function) {
          fn(data);
        });
      }
    },
    $on(eventName: string, fn: Function) {
      if (this.events.get(eventName)) {
        let newList = this.events.get(eventName);
        newList.push(fn);
        this.events.set(eventName, newList);
      } else {
        this.events.set(eventName, [fn]);
      }
    },
    $off(eventName: string, fn: Function) {
      if (this.events.get(eventName)) {
        for (var i = 0; i < this.events.get(eventName).length; i++) {
          if (this.events.get(eventName)[i] === fn) {
            this.events.get(eventName).splice(i, 1);
            break;
          }
        }
      }
    },
  },
});
