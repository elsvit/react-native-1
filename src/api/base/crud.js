// @flow
import type { AxiosPromise } from 'axios';
import type { ReqType } from '../index';

type CrudConfig = {|
  url: string,
  request: ReqType,
  id: string,
|};

class CRUD<M: Object> {
  config: CrudConfig;
  r: ReqType;

  constructor(config: CrudConfig) {
    this.config = config;
    this.r = this.config.request;
  }

  get(params: Object): AxiosPromise<Array<M>> {
    return this.r({
      method: 'GET',
      url: this.config.url,
      params,
    });
  }

  one(id: number): AxiosPromise<M> {
    return this.r({
      method: 'GET',
      url: `${this.config.url}/${id}`,
    });
  }

  update(data: $Shape<M>): AxiosPromise<M> {
    return this.r({
      method: 'PATCH',
      url: `${this.config.url}/${data[this.config.id]}`,
      data,
    });
  }

  create(data: *): AxiosPromise<M> {
    return this.r({
      method: 'POST',
      url: this.config.url,
      data,
    });
  }

  delete(id: number): AxiosPromise<M> {
    return this.r({
      method: 'DELETE',
      url: `${this.config.url}/${id}`,
    });
  }

  deleteByToken(): AxiosPromise<M> {
    return this.r({
      method: 'DELETE',
      url: this.config.url,
    });
  }
}

export default CRUD;
