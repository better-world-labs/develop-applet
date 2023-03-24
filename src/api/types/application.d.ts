/*
 * @Author: Lemon
 * @Date: 2023-03-24 14:41:19
 * @Description: 应用相关数据结构
 */
declare namespace Application {
  export interface tabInfoItf {
    label: string;
    category: number;
    order: number;
  }

  export interface resultInfoItf {
    id: number;
    type: string;
    content: string;
  }

  export interface appInfoItf {
    id: number;
    uuid: string;
    name: string;
    description: string;
    results: resultInfoItf[];
    createdBy: User.UserInfoItf;
    createdAt: string;
    updatedAt: string;
    status: Number; // 生命周期 (0.未发布 1.已发布)
  }
}
