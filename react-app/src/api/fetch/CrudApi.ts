import { functionalFetch } from "./fetch";

export class CrudAPI<Type, TypeId> {
  constructor(readonly prefix: string) {}
  post = async (data: Type) => {
    return await functionalFetch({
      url: `${this.prefix}`,
      method: "POST",
      body: { data },
    });
  };
  getAllData = async () => {
    return functionalFetch({
      url: `${this.prefix}`,
      method: "GET",
    });
  };
  getDataById = async (id: TypeId) => {
    return functionalFetch({
      url: `${this.prefix}/${id}`,
      method: "GET",
    });
  };
  delete = async (id: TypeId) => {
    functionalFetch({
      url: `${this.prefix}/${id}`,
      method: "DELETE",
    });
  };
  update = async (data: Type) => {
    return functionalFetch({
      url: `${this.prefix}/x`,
      method: "PUT",
      body: { data },
    });
  };
}
