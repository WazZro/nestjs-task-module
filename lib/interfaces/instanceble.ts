import { Observable } from 'rxjs';
import { EventEmitter } from 'events';

export abstract class Instanceble extends EventEmitter {
  public abstract isMaster(): boolean | Promise<boolean> | Observable<boolean>;
}
