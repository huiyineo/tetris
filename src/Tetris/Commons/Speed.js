const Speed = {
  getSpeed: (level) => {
    switch (level) {
      case 1:
        return 1000;
      case 2:
        return 793;
      case 3:
        return 618; //617.8
      case 4:
        return 473; //472.73
      case 5:
        return 355; //355.20
      case 6:
        return 262;
      case 7:
        return 190; //189.68
      case 8:
        return 135; //134.73
      case 9:
        return 94; //93.88
      case 10:
        return 64; //64.15
      case 11:
        return 43; //42.98
      case 12:
        return 28; //28.22
      case 13:
        return 18; //18.15
      case 14:
        return 11; //11.44
      case 15:
        return 7; //7.06
      case 16:
        return 4; //4.26
      case 17:
        return 3; //2.52
      case 18:
        return 1; //1.46
      default:
        return 1000;
    }
  },
};

export default Speed;
