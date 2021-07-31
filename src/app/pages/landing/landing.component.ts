import { Component, OnInit } from '@angular/core';
import { tsParticles } from "tsparticles"

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.sass']
})
export class LandingComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {  
    tsParticles.load("tsparticles", {
  "background": {
    "color": {
      "value": "#404040"
    },
    // "position": "50% 50%",
    // "repeat": "no-repeat",
    // "size": "cover"
  },
  "fullScreen": {
    "enable": true,
    "zIndex": 1
  },
  "interactivity": {
    "events": {
      "onClick": {
        "mode": "push"
      },
      "onHover": {
        "enable": true,
        "mode": "bubble"
      }
    },
    "modes": {
      "bubble": {
        "distance": 400,
        "duration": 2,
        "opacity": 0.8,
        "color": {
          "value": "#00d1b2"
        },
        "size": 40
      },
      "grab": {
        "distance": 400
      }
    }
  },
  "particles": {
    "color": {
      "value": "#1b1e34"
    },
    "links": {
      "color": {
        "value": "#ffffff"
      },
      "distance": 200,
      "width": 2
    },
    "move": {
      "attract": {
        "rotate": {
          "x": 600,
          "y": 1200
        }
      },
      "enable": true,
      "path": {},
      //@ts-ignore
      "outModes": {
        "bottom": "out",
        "left": "out",
        "right": "out",
        "top": "out"
      },
      "speed": 8,
      "spin": {}
    },
    "number": {
      "density": {
        "enable": true
      },
      "value": 6
    },
    "opacity": {
      "random": {
        "enable": true,
        "minimumValue": 0.3
      },
      "value": {
        "min": 0.3,
        "max": 0.5
      },
      "animation": {
        "speed": 1,
        "minimumValue": 0.1
      }
    },
    "shape": {
      "options": {
        "polygon": {
          "sides": 6
        },
        "star": {
          "sides": 6
        }
      },
      "type": "polygon"
    },
    "size": {
      "random": {
        "enable": true,
        "minimumValue": 100
      },
      "value": {
        "min": 100,
        "max": 160
      },
      "animation": {
        "minimumValue": 40
      }
    }
  }
})
  
    
  }
}
