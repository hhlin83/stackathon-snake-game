// Import modules
import { Canvas } from '@react-three/fiber';
import { softShadows, OrbitControls } from '@react-three/drei';

// Import components
import './App.css';
import Floor from './components/Floor';
import Box from './components/Box';

// softShadows();

function App() {
  return (
    <div id="canvas-container">
      <Canvas
        colorManagement
        shadows
        camera={{ position: [-5, 2, 10], fov: 60 }}
      >
        <OrbitControls />
        <ambientLight intensity={0.3} />
        <directionalLight castShadow position={[0, 10, 0]} intensity={1.5} />
        <pointLight position={[-10, 0, -20]} intensity={0.5} />
        <pointLight position={[0, -10, 0]} intensity={1.5} />
        <Floor position={[0, -1, 0]} />
        <Box position={[0, 1, 0]} color="lightblue" args={[3, 2, 1]} />
      </Canvas>
    </div>
  );
}

export default App;
