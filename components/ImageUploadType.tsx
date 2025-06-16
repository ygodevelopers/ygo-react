import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "@/firebaseConfig";
import * as ImageManipulator from "expo-image-manipulator";
import uuid from "react-native-uuid";

export type ImageUploadType = "profile";

const uploadImageToFirebase = async (
    uri: string,
    type: ImageUploadType = "profile"
): Promise<string> => {
    const filename = uuid.v4();

    const paths = {
        profile: { path: `profile_images/${filename}`, compress: 0.1 },
    };

    const { path, compress } = paths[type];

    const manipulated = await ImageManipulator.manipulateAsync(uri, [], {
        compress,
        format: ImageManipulator.SaveFormat.JPEG,
    });

    const response = await fetch(manipulated.uri);
    const blob = await response.blob();
    const imageRef = ref(storage, path);
    await uploadBytes(imageRef, blob);
    const downloadUrl = await getDownloadURL(imageRef);
    return downloadUrl;
};

export default uploadImageToFirebase;