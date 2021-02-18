import * as fs from 'fs';
import * as path from 'path';
import * as prettier from 'prettier';

const ROOT_DIR = path.join(__dirname, '..');
const RESULT_ICONS_ROOT_PATH = path.join(ROOT_DIR, 'src/app/icons/icons');

async function genIconsList(iconsDirPath: string) {
    const iconsDirName = path.basename(iconsDirPath);
    const resultPath = path.join(RESULT_ICONS_ROOT_PATH, `${iconsDirName}.json`);

    const icons = fs.readdirSync(iconsDirPath).map((file) => file.slice(0, -4));
    const filePath = await prettier.resolveConfigFile();
    const options = await prettier.resolveConfig(filePath);
    const formatted = prettier.format(JSON.stringify(icons), { ...options, parser: 'json' });
    fs.writeFileSync(resultPath, formatted);

    // tslint:disable-next-line:no-console
    console.log(`Icons list generated: ${resultPath}`);
}

(async () => {
    return await Promise.all([genIconsList('src/assets/icons'), genIconsList('src/assets/persian-green-icons')]);
})();
