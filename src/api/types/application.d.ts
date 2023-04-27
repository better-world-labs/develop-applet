/*
 * @Author: Lemon
 * @Date: 2023-03-24 14:41:19
 * @Description: 应用相关数据结构
 */
declare namespace Application {
  export interface goodsItf {
    id: number;
    price: number;
    points: number;
    tag: string;
  }
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

  export interface formItemItf {
    id: string;
    label: string;
    type: string;
    properties: {
      placeholder: string;
    };
  }

  export interface appDetailItf {
    id: number;
    uuid: string;
    name: string;
    category: number;
    description: string;
    form: formItemItf[];
    createdBy: User.UserInfoItf;
    createdAt: string;
    updatedAt: string;
    status: number; // 生命周期 (0.未发布 1.已发布)
  }

  export interface appResultItf {
    id: number;
    type: string;
    inputArgs: string[];
    content: string;
    createdAt: string;
    createdBy: User.UserInfoItf;
  }

  export interface appResultStateItf {
    outputId: number;
    like: number;
  }
}
