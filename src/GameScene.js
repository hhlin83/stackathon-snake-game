// Import modules
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import './GameScene.css';

// Import components
import GameUI from './components/GameUI';
import GameManager from './components/GameManager';
import Floor from './components/Floor';
import Player from './components/Player';
import Followers from './components/Followers';

export default function GameScene() {
  return (
    <div id="game-scene">
      <GameUI />
      <Canvas
        style={{ position: 'absolute' }}
        colorManagement
        shadows
        camera={{ position: [-5, 10, 10], fov: 60 }}
      >
        <GameManager>
          <OrbitControls />
          <ambientLight intensity={0.3} />
          <directionalLight
            castShadow
            position={[0, 10, 0]}
            intensity={1.5}
            shadow-camera-far={500}
            shadow-camera-left={-50}
            shadow-camera-right={50}
            shadow-camera-top={50}
            shadow-camera-bottom={-50}
          />
          <pointLight position={[-10, 0, -20]} intensity={0.5} />
          <pointLight position={[0, -10, 0]} intensity={1.5} />
          <Floor position={[0, -1, 0]} />
          <Player position={[0, 0, 0]} color="lightblue" args={[1, 1, 1]} />
          <Followers />
        </GameManager>
      </Canvas>
    </div>
  );
}
