import { promises as fs } from 'fs';
import { glob } from 'glob';
import * as path from 'path';
import * as uuid from 'uuid';

const ROOT_DIR = path.join(__dirname, '..');
const ATTR_REGEXP = /(\S+)=["']?((?:.(?!["']?\s+(?:\S+)=|\s*\/?[>"']))+.)["']?/g;

async function genIconsIds() {
    glob('src/assets/**/*.svg', { root: ROOT_DIR }, async (er, files) => {
        for (const file of files) {
            let data = await fs.readFile(path.join(ROOT_DIR, file), 'utf8');
            const attrs = data.match(ATTR_REGEXP).map((attr) => {
                const resAttr = attr.split('=').map((kv) => kv.trim());
                resAttr[1] = resAttr[1].slice(1, -1);
                return resAttr;
            });
            const ids = attrs.filter((attr) => attr[0] === 'id');
            if (ids.length) {
                let idx = 0;
                for (const id of ids) {
                    const newId = `ID-${idx}__${uuid()}`;
                    idx += 1;
                    data = data.replace(new RegExp(id[1], 'g'), newId);
                }
                await fs.writeFile(path.join(ROOT_DIR, file), data, 'utf8');

                // tslint:disable-next-line:no-console
                console.log(`File ${file} ids (${ids.length}) replaced`);
            }
        }
    });
}

genIconsIds();
