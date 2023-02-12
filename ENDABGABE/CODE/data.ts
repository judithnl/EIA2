namespace fireworks {
 
    export interface Rocket {
        preset: string;
        startColor: string;
        endColor: string;
        lifetime: number;
        particleSize: number;
        spawnAmount: number;
        explosionTimes: number;
    }
      
   
    export interface RocketData {
        [category: string]: Rocket[];
    }
}