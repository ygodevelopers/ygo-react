import CustomKeyboardView from '@/components/CustomKeyboardView';
import { useAuth } from '@/context/authContext';
import { contactCollection, userRef } from '@/firebaseConfig';
import { Contact, User } from '@/types';
import { Image } from 'expo-image';
import { useRouter} from 'expo-router';
import { getDocs, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import {View, Button, StyleSheet, Text, TouchableOpacity, TextInput} from 'react-native';
import {AlphabetList, IData as AlphabetListData, IData} from 'react-native-section-alphabet-list';

export default function AddContact()  {
    const router = useRouter();
    const {user} = useAuth();
    const [email, onChangeEmail] = useState<string>();
    const [userContacts, setUserContacts] = useState<User[]>();

    useEffect(() => {
        getContacts();
    }, [userContacts]);


    const getContacts = async () => {
        try {
            const contactsContainer : Contact[] = [];
            const q = query(contactCollection, where('ownerId', '==', user.id));
            const qSnapshot = await getDocs(q);
            qSnapshot.forEach((doc) => {contactsContainer.push(doc.data() as Contact)});
            getUsersFromContacts(contactsContainer);
        } catch (error) {
            console.error("Error fetching contact:", error);
        }
    }

    const getUsersFromContacts = async (contacts: Contact[]) => {
        const promises = contacts.map(async (contact) => {
            const q = query(userRef, where('id', '==', contact.contactUserId));
            const qSnapshot = await getDocs(q);
            const user : User[] = [];
            qSnapshot.forEach((doc) => {
                user.push(doc.data() as User);
            })
            return user;
        });

        const result = await Promise.all(promises);
        const usersContainer : User[] = result.flat();
        setUserContacts(usersContainer);
    }

    const getSearchContact = async (): Promise<User | null> => {
        try {
            const q = query(userRef, where('email', '==', email?.trim().toLowerCase()));
            const qSnapshot = await getDocs(q);
            
            if (qSnapshot.empty) {
                return null; // No user found
            }
            
            let foundUser: User | null = null;
            qSnapshot.forEach((doc) => {
                foundUser = doc.data() as User;
            });
            
            return foundUser;
        } catch (error) {
            console.error("Error fetching contact:", error);
            return null;
        }
    }

    const verifyEmail = () => {
        if (!email) {
            alert("Please enter an email address");
            return false;
        }
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if(regex.test(email.trim().toLowerCase())){
            return true;
        } else {
            alert("Please enter a valid email");
            return false;
        }
    }   

    const handleSearch = async () => {
        if(verifyEmail()) {
            const foundContact = await getSearchContact();
            
            if (foundContact) {
                router.push({pathname: '/(app)/ConfirmContact', params: {contactID: foundContact.id}});
            } else {
                alert("No user found with this email address");
            }
        }
    }

    const sendToChatRoom = (item: IData) => {
        router.replace({pathname: '/(app)/chatRoom', params: {contactID: item.key}});
    }

    return (
        <View style={styles.container}>
            <View style={styles.searchSection}>
                <TextInput 
                    onChangeText={onChangeEmail} 
                    style={styles.input} 
                    placeholder='Enter an Email' 
                    keyboardType='email-address'
                    autoCapitalize='none'
                />
                <Button title='Search' onPress={handleSearch}/>
            </View>
            {
                userContacts && 
                <AlphabetList
                    data={userContacts.map((contact) => ({
                        key: contact.id!,
                        value: contact.firstName,
                        ...contact
                    }))}
                    indexLetterStyle={{ 
                        color: 'blue', 
                        fontSize: 15,
                    }}
                    renderCustomItem={(item) => (
                        <TouchableOpacity 
                            onPress={() => {sendToChatRoom(item)}}
                            style={styles.contactItem}
                        >
                            <View style={styles.contactContent}>
                                {item?.profileImageUrl ? (
                                    <Image
                                        source={{ uri: item.profileImageUrl }} 
                                        style={styles.profileImage}
                                    />
                                ) : (
                                    <View style={styles.initialsContainer}>
                                        <Text style={styles.initialsText}>
                                            {`${item?.value?.charAt(0) || ""}${item?.lastName?.charAt(0) || ""}`.toUpperCase() || "?"}
                                        </Text>
                                    </View>
                                )}
                                <View style={styles.nameContainer}>
                                    <Text style={styles.nameText}>
                                        {item.value} {item.lastName}
                                    </Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    )}
                    style={styles.alphabetList}
                />
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    searchSection: {
        padding: 16,
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
        alignItems: 'center',
    },
    input: {
        height: 40,
        width: '100%',
        maxWidth: 300,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        paddingHorizontal: 12,
        marginBottom: 12,
        backgroundColor: 'white',
    },
    alphabetList: {
        flex: 1,
        backgroundColor: 'white',
    },
    contactItem: {
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    contactContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    profileImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    initialsContainer: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#gray-400',
        alignItems: 'center',
        justifyContent: 'center',
    },
    initialsText: {
        color: 'white',
        fontWeight: '600',
        fontSize: 16,
    },
    nameContainer: {
        marginLeft: 12,
        flex: 1,
    },
    nameText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#333',
    },
});