document.addEventListener('DOMContentLoaded', () => {
    const model = new CowStrikeModel();
    const view = new CowStrikeView();
  
    // เริ่มการทำงานเมื่อคลิกปุ่ม
    document.getElementById('processButton').addEventListener('click', () => {
      model.process();
      view.updateView(model);
    });
  
    // ฟังก์ชันสำหรับการเพิ่มวัวใหม่
    document.getElementById('addCowButton').addEventListener('click', () => {
      const id = parseInt(document.getElementById('cowId').value);
      const teats = parseInt(document.getElementById('cowTeats').value);
      const targetMachine = parseInt(document.getElementById('cowTargetMachine').value);
      const newCow = new Cow(id, teats, targetMachine);
      model.cowsQueue.push(newCow);
      view.updateView(model);
    });
  });
  