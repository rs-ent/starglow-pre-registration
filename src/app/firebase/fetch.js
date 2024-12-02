import { db, storage } from './firebase';
import { doc, collection, addDoc, setDoc, serverTimestamp } from 'firebase/firestore';

/**
 * Firestore에서 데이터를 저장하거나 업데이트합니다.
 * 데이터 저장 시 `created_at`과 `updated_at` 필드를 서버 타임스탬프로 자동 추가/업데이트합니다.
 *
 * @param {string} collectionName - Firestore 컬렉션 이름
 * @param {Object} data - 저장하거나 업데이트할 데이터 객체
 * @param {string|null} [docId=null] - 업데이트할 문서 ID. 없으면 새 문서를 생성합니다.
 * @returns {Promise<string>} - 성공 시 문서 ID 반환
 *
 * @example
 * // 새 데이터를 추가
 * const docId = await saveDataWithQuery('artists', { name: 'New Artist', genre: 'Pop' });
 * console.log('Added document ID:', docId);
 *
 * @example
 * // 기존 문서를 업데이트
 * const updatedDocId = await saveDataWithQuery('artists', { genre: 'Rock' }, 'existingDocId');
 * console.log('Updated document ID:', updatedDocId);
 */
export async function saveData(collectionName, data, docId = null) {
    try {
        if (!collectionName || !data) {
            throw new Error('Collection name and data are required.');
        }

        const collectionRef = collection(db, collectionName);

        if (docId) {
            // 기존 문서 업데이트 또는 덮어쓰기
            const docRef = doc(collectionRef, docId);
            await setDoc(docRef, { 
                ...data, 
                updated_at: serverTimestamp() // 업데이트 시간 추가
            }, { merge: true }); // 병합 옵션 사용
            console.log(`Document updated with ID: ${docId}`);
            return docId;
        } else {
            // 새 문서 추가
            const docRef = await addDoc(collectionRef, { 
                ...data, 
                created_at: serverTimestamp(), // 생성 시간 추가
                updated_at: serverTimestamp() // 업데이트 시간 추가
            });
            console.log(`New document added with ID: ${docRef.id}`);
            return docRef.id;
        }
    } catch (error) {
        console.error('Error saving data:', error);
        throw error; // 오류 발생 시 호출한 함수로 다시 던짐
    }
}