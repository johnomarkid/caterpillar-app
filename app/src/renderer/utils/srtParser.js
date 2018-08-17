import fs from 'fs';

function parseSrtFromPath(path) {
  let data = fs.readFileSync(path, 'utf8');
  data = data.replace(/\r/g, '');
  const regex = /(\d+)\n(\d{2}:\d{2}:\d{2},\d{3}) --> (\d{2}:\d{2}:\d{2},\d{3})/g;
  data = data.split(regex);
  data.shift();

  const items = [];
  for (let i = 0; i < data.length; i += 4) {
		const st = data[i + 1].trim()
		const startTime = st.split(',')[0]
		const et = data[i + 2].trim()
		const endTime = et.split(',')[0]
		
    items.push({
      id: data[i].trim(),
			startTime,
      endTime,
      text: data[i + 3].trim(),
    });
  }

  return items;
}

export { parseSrtFromPath };
