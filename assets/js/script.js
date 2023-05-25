$(document).ready(function() {

  const baseUrl = 'https://swapi.dev/api/people/';

  $('#firstRow').one('mouseover', function() {
    var rowId = $(this).attr('id');
    generateContentBlocks(1, 5, rowId);
  });

  $('#secondRow').one('mouseover', function() {
    var rowId = $(this).attr('id');
    generateContentBlocks(6, 10, rowId);
  });

  $('#thirdRow').one('mouseover', function() {
    var rowId = $(this).attr('id');
    generateContentBlocks(11, 15, rowId);
  });

  async function getCharacterInfo(characterId) {
    try {
      const response = await fetch(`${baseUrl}${characterId}`);
      const data = await response.json();
      console.log('data', data)
      return {
        name: data.name,
        height: data.height,
        mass: data.mass
      };
    } catch (error) {
      console.log('Error:', error);
    }
  }

  function createContentBlock(characterInfo, rowId) {

    let color;

    if (rowId == 'firstRow') {
      color = 'salmon'
    } else if (rowId == 'secondRow'){
      color = 'lightgreen'
    } else if (rowId == 'thirdRow') {
      color = 'lightskyblue'
    }

    const block = `
      <div class="col-12 col-md-6 col-lg-4">
        <div class="single-timeline-content d-flex wow fadeInLeft" data-wow-delay="0.3s" style="visibility: visible; animation-delay: 0.3s; animation-name: fadeInLeft;">
          <div class="timeline-icon" style="background-color: ${color};"></div>
          <div class="timeline-text">
            <h6>${characterInfo.name}</h6>
            <p>Altura: ${characterInfo.height} cm</p>
            <p>Peso: ${characterInfo.mass} kg</p>
          </div>
        </div>
      </div>
    `;
    return block;
  }

  function* generateCharacterIds(startId, endId) {
    for (let i = startId; i <= endId; i++) {
      yield i;
    }
  }
  
  async function generateContentBlocks(startId, endId, rowId) {

    const characterIds = generateCharacterIds(startId, endId);
    console.log('characterIds', characterIds)
    let currentId = characterIds.next();

    while (!currentId.done) {

      const characterInfo = await getCharacterInfo(currentId.value);
      const block = createContentBlock(characterInfo, rowId);

      $(`#${rowId}`).after(block)
  
      currentId = characterIds.next();
    }
  }


});
