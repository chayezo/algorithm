function stringify(value) {
    if (value === null) {
        return 'null';
    }
    if (typeof value === 'number') {
        return `${value}`;
    }
    if (typeof value === 'boolean') {
        return value ? 'true' : 'false';
    }
    if (typeof value === 'string') {
        return `"${value.replace('"', '\\"')}"`;
    }
    if (Array.isArray(value)) {
        return `[${value.map(stringify).join(",")}]`;
    }
    return `{${Object.entries(value).map(([k, v]) =>
        `"${k.replace('"', '\\"')}":${stringify(v)}`).join(",")}}`;
}