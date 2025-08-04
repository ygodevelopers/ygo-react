import 'react-native-gesture-handler/jestSetup';

// Mock Firebase Auth
jest.mock('firebase/auth', () => ({
  getAuth: jest.fn(),
  onAuthStateChanged: jest.fn(),
  createUserWithEmailAndPassword: jest.fn(),
  signInWithEmailAndPassword: jest.fn(),
  signOut: jest.fn(),
}));

// Mock Firebase Firestore
jest.mock('firebase/firestore', () => ({
  getFirestore: jest.fn(),
  doc: jest.fn(),
  getDoc: jest.fn(),
  setDoc: jest.fn(),
  onSnapshot: jest.fn(),
}));

// Mock your auth context
jest.mock('@/context/authContext', () => ({
  useAuth: () => ({
    login: jest.fn(),
    user: null,
  }),
}));

// Mock expo-router
jest.mock('expo-router', () => ({
  useRouter: () => ({
    push: jest.fn(),
    back: jest.fn(),
  }),
}));

// Mock responsive screen
jest.mock('react-native-responsive-screen', () => ({
  widthPercentageToDP: jest.fn((percentage) => percentage),
  heightPercentageToDP: jest.fn((percentage) => percentage),
}));

// Mock expo-status-bar
jest.mock('expo-status-bar', () => ({
  StatusBar: 'StatusBar',
}));

