export interface PaisSmall {
    name: Name;
    cca2: string;
}

export interface Name {
    common:     string;
    official:   string;
    nativeName: NativeName;
}

export interface NativeName {
    ara: Ara;
}

export interface Ara {
    official: string;
    common:   string;
}