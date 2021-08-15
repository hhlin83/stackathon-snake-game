// Import modules
import { Canvas } from '@react-three/fiber';
import { /* softShadows, */ OrbitControls } from '@react-three/drei';

// Import components
import './App.css';
import Floor from './components/Floor';
import Player from './components/Player';
// import Follower from './components/Follower';
import FollowerManager from './components/FollowerManager';

// softShadows();

function App() {
  return (
    <div id="canvas-container">
      <Canvas
        colorManagement
        shadows
        camera={{ position: [-5, 10, 10], fov: 60 }}
      >
        <OrbitControls />
        <ambientLight intensity={0.3} />
        <directionalLight
          castShadow
          position={[0, 10, 0]}
          intensity={1.5}
          // shadow-mapSize-width={1024}
          // shadow-mapSize-height={1024}
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
        {/* <Follower position={[-2, 0, 0]} />
        <Follower position={[-4, 0, 0]} /> */}
        <FollowerManager />
      </Canvas>
    </div>
  );
}

export default App;
