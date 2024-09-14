class CowStrikeView {
    constructor() {
      this.milkProducedElement = document.getElementById('milkProduced');
      this.interruptionsElement = document.getElementById('interruptions');
      this.cowsProcessedElement = document.getElementById('cowsProcessed');
      this.problematicCowsElement = document.getElementById('problematicCows');
      this.machinesStatusElement = document.getElementById('machinesStatus');
    }
  
    // อัปเดตข้อมูลที่แสดงใน UI
    updateView(model) {
      this.milkProducedElement.textContent = `Milk Produced: ${model.milkProduced} liters`;
      this.interruptionsElement.textContent = `Interruptions: ${model.interruptions}`;
      this.cowsProcessedElement.textContent = `Cows Processed: ${model.cowsProcessed}`;
      this.problematicCowsElement.textContent = `Problematic Cows: ${model.problematicCows}`;
      this.updateMachinesStatus(model.machines);
    }
  
    // อัปเดตสถานะของเครื่องรีดนมใน UI
    updateMachinesStatus(machines) {
      this.machinesStatusElement.innerHTML = '';
      machines.forEach(machine => {
        const machineElement = document.createElement('div');
        machineElement.textContent = `Machine ${machine.id}: ${machine.status}`;
        this.machinesStatusElement.appendChild(machineElement);
      });
    }
  }
  