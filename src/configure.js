import 'core-js';

import {inject} from 'aurelia-dependency-injection';
import {HttpClient} from 'aurelia-http-client';
import {EventAggregator} from 'aurelia-event-aggregator';

// Secure references that can't be changed outside of Configure singleton class
const ENVIRONMENT = new WeakMap();
const DIRECTORY = new WeakMap();
const CONFIG_FILE = new WeakMap();
const CONFIG_OBJECT = new WeakMap();

@inject(HttpClient, EventAggregator)
export class Configure {
    constructor(http, ea) {
        // Injected dependencies
        this.http = http;
        this.ea = ea;

        CONFIG_OBJECT.set(this, {});

        ENVIRONMENT.set(this, 'DEFAULT');
        DIRECTORY.set(this, 'config');
        CONFIG_FILE.set(this, 'application.json');
    }

    setDirectory(path) {
        DIRECTORY.set(this, path);
    }

    setConfig(name) {
        CONFIG_FILE.set(this, name);
    }

    get obj() {
        return CONFIG_OBJECT.get(this);
    }

    get environment() {
        return ENVIRONMENT.get(this);
    }

    get directory() {
        return DIRECTORY.get(this);
    }

    get config() {
        return CONFIG_FILE.get(this);
    }

        if (key.indexOf('.') === -1) {
            return this.obj[key] ? this.obj[key] : false;
        } else {
            let splitKey = key.split('.');
            let parent = splitKey[0];
            let child = splitKey[1];

            if (this.obj[parent]) {
                return this.obj[parent][child] ? this.obj[parent][child] : false;
            }

            return false;
        }
    }

    set(key, val) {
        if (key.indexOf('.') === -1) {
            this.obj[key] = val;
        } else {
            let splitKey = key.split('.');
            let parent = splitKey[0];
            let child = splitKey[1];

            this.obj[parent][child] = val;
        }
    }

    setAll(obj) {
        CONFIG_OBJECT.set(this, obj);
    }

    getAll() {
        return this.obj;
    }

    loadConfig() {
        return new Promise((resolve, reject) => {
            this.http
              .get(`${this.directory}/${this.config}`)
              .then(response => {
                  resolve(response.content);
              })
              .catch(() => reject(new Error('Configuration file could not be found or loaded.')));
        });
    }
}
