// Class สำหรับการจัดการข้อมูลของวัว
class Cow {
    constructor(id, teats, targetMachine) {
      this.id = id; // ID ของวัว
      this.teats = teats; // จำนวนเต้า
      this.targetMachine = targetMachine; // เครื่องรีดที่เล็งไว้
      this.status = 'waiting'; // สถานะของวัว
      this.isMale = Math.random() < 0.05; // กำหนดว่าวัวเป็นเพศผู้หรือไม่
    }
  
    // ตรวจสอบว่าวัวเป็นเพศผู้หรือไม่
    isValid() {
      return !this.isMale && this.teats === 4;
    }
  }
  
  // Class สำหรับการจัดการสถานะของเครื่องรีดนม
  class MilkingMachine {
    constructor(id) {
      this.id = id; // หมายเลขเครื่องรีดนม
      this.status = 'available'; // สถานะของเครื่องรีด
      this.cow = null; // วัวที่อยู่ในเครื่องรีด
    }
  
    // เปลี่ยนสถานะของเครื่องรีด
    updateStatus(newStatus) {
      this.status = newStatus;
    }
  }
  
  // Class สำหรับการจัดการสถานะทั้งหมดของโปรแกรม Cow Strike
  class CowStrikeModel {
    constructor() {
      // สร้างเครื่องรีดนม 10 เครื่อง
      this.machines = Array.from({ length: 10 }, (_, i) => new MilkingMachine(i + 1));
      this.cowsQueue = []; // คิวสำหรับวัวที่รอ
      this.milkProduced = 0; // จำนวนผลผลิตนมที่ผลิตได้
      this.interruptions = 0; // จำนวนครั้งที่โปรแกรมหยุดทำงาน
      this.cowsProcessed = 0; // จำนวนวัวที่ได้รับการรีดนมแล้ว
      this.problematicCows = 0; // จำนวนวัวที่มีปัญหา
    }
  
    // ฟังก์ชันหลักสำหรับการจัดการสถานะของเครื่องรีดนมและวัว
    process() {
      // 1. นำหัวของเครื่องรีดนมไปเข้ากับเต้านมที่ว่างอยู่
      this.machines.forEach(machine => {
        if (machine.status === 'available' && machine.cow && machine.cow.status === 'waiting') {
          // หัวเครื่องรีดนมเข้ากับเต้าที่ว่าง
          const availableTeats = machine.cow.teats;
          if (availableTeats > 0) {
            machine.updateStatus('cleaning');
            machine.cow.teats -= 1;
          }
        }
      });
  
      // 2. เปลี่ยนสถานะเครื่องรีดนมจาก "กำลังทำความสะอาด" เป็น "เตรียมพร้อม"
      this.machines.forEach(machine => {
        if (machine.status === 'cleaning') {
          machine.updateStatus('ready');
        }
      });
  
      // 3. ถ้าครบ 4 หัวที่สถานะ "เตรียมพร้อม", เปลี่ยนสถานะเป็น "กำลังรีดนม"
      this.machines.forEach(machine => {
        const readyMachines = this.machines.filter(m => m.status === 'ready');
        if (readyMachines.length >= 4) {
          readyMachines.slice(0, 4).forEach(m => m.updateStatus('milking'));
        }
      });
  
      // 4. วัวที่กำลังรีดนมผลิตนมและถูกนำออก
      this.machines.forEach(machine => {
        if (machine.status === 'milking') {
          if (machine.cow.isValid()) {
            this.milkProduced += 1; // วัวที่ไม่มีปัญหาผลิตนม 1 ลิตร
          } else {
            this.milkProduced += 0.5; // วัวที่มีปัญหาผลิตนม 0.5 ลิตร
            this.problematicCows += 1;
          }
          this.cowsProcessed += 1;
          machine.cow = null;
          machine.updateStatus('available');
        }
      });
  
      // 5. จัดการวัวที่อยู่ในคิว
      this.cowsQueue.forEach(cow => {
        let machineFound = false;
        for (let i = cow.targetMachine - 1; i < this.machines.length; i++) {
          const machine = this.machines[i];
          if (machine.status === 'available') {
            machine.cow = cow;
            machine.updateStatus('cleaning');
            machineFound = true;
            break;
          }
        }
        if (!machineFound) {
          // ลองจากเครื่องหมายเลข 1 ถึง 10 ถ้าไม่พบเครื่องว่าง
          for (let i = 0; i < cow.targetMachine - 1; i++) {
            const machine = this.machines[i];
            if (machine.status === 'available') {
              machine.cow = cow;
              machine.updateStatus('cleaning');
              machineFound = true;
              break;
            }
          }
        }
        if (!machineFound) {
          // วัวรอในคิวต่อไป
          this.cowsQueue.push(cow);
        }
      });
  
      // 6. ตรวจสอบข้อผิดพลาดและหยุดทำงานถ้ามีปัญหา
      const problematicCows = this.machines.filter(machine => machine.cow && !machine.cow.isValid());
      if (problematicCows.length >= 8) {
        this.interruptions += 1;
        this.reset(); // รีเซ็ตสถานะทั้งหมด
      }
    }
  
    // รีเซ็ตสถานะทั้งหมดของโปรแกรม
    reset() {
      this.machines.forEach(machine => {
        machine.updateStatus('available');
        machine.cow = null;
      });
      this.cowsQueue = [];
      this.milkProduced = 0;
      this.interruptions = 0;
      this.cowsProcessed = 0;
      this.problematicCows = 0;
    }
  }
  