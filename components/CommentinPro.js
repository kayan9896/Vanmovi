import { View, Text, FlatList, StyleSheet, Pressable, TextInput, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { auth } from '../firebase/setup.js';
import { db } from '../firebase/setup.js';
import { remove, update } from '../firebase/util.js';

export default function CommentinPro() {
    const [cm, setCm] = React.useState([]);

    useEffect(() => {
        const dt = onSnapshot(query(collection(db, "comments"), where("user", '==', auth.currentUser.uid)), q => {
            const puredt = q.empty ? [] : q.docs.map(function(i){return {...i.data(), id: i.id}});
            setCm(puredt);
        })
        return () => { dt() };
      }, []);

    return (
        <View>
            <FlatList data={cm} renderItem={({ item }) => <CommentItem i={item} />}/>
        </View>
    );
}

const CommentItem = ({ i }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedComment, setEditedComment] = useState(i.cm);

    const handleConfirm = async () => {
        if (editedComment !== i.cm) {
            await update('comments', i.id, { cm: editedComment });
        }
        setIsEditing(false);
    };

    const handleDelete = () => {
        Alert.alert(
            "Alert",
            "Do you want to delete this comment?",
            [
                {
                    text: "NO",
                    onPress: () => {},
                    style: "cancel"
                },
                {
                    text: "YES",
                    onPress: () => {
                        remove('comments', i.id);
                        alert('Comment deleted');
                    }
                }
            ],
            { cancelable: true }
        );
    };

    if (isEditing) {
        return (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <TextInput
                    value={editedComment}
                    onChangeText={setEditedComment}
                    style={styles.commentInput}
                />
                <Pressable onPress={handleConfirm}>
                    <Text style={styles.actionText}>Confirm</Text>
                </Pressable>
            </View>
        );
    }

    return (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ flex: 1 }}>
                <Text style={styles.commentText}>{i.cm} from {i.mv}</Text>
            </View>
            <Pressable onPress={() => setIsEditing(true)}>
                <Text style={styles.actionText}>Edit</Text>
            </Pressable>
            <Pressable onPress={handleDelete} style={styles.deleteContainer}>
                <Text style={styles.actionText}>Delete</Text>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    commentText: {
        fontSize: 15,
        color: '#444',
        marginBottom: 10,
        padding: 10,
        backgroundColor: 'rgba(0,0,0,0.05)',
        borderRadius: 5,
    },
    actionText: {
        color: 'dodgerblue',
        marginLeft: 10,
    },
    deleteContainer: {
        marginRight: 10,
    },
    commentInput: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.05)',
        padding: 10,
        borderRadius: 5,
    },
});
