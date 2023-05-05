/*
 * @Author: Sandy
 * @Date: 2023-04-21 15:10:38
 * @Description:
 */
/*
 * @Author: Sandy
 * @Date: 2022-11-08 11:16:18
 * @Description:
 */
declare namespace AppSystem {
  interface VersionNotify {
    id: number;
    title: string;
    image: string;
  }
  interface SystemConfig {
    value: number;
  }

  interface TimeQuantum {
    startTime: string;
    endTime: string;
    // "startTime": "2022-11-09T07:40:16.787Z",
    // "endTime": "2022-11-09T07:40:16.787Z"
  }

  interface TimeQuantumList {
    timeQuantum: TimeQuantum[];
  }

  interface TriggerResponse {
    type: string;
    payload?: { unread?: number };
  }
}
