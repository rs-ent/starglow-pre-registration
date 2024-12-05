import { db, storage } from './firebase';
import { doc, collection, addDoc, setDoc, serverTimestamp, query, where, getDoc, getDocs } from 'firebase/firestore';


/**
 * Firestore에서 데이터를 조건(query)에 따라 가져옵니다.
 *
 * @param {string} collectionName - Firestore 컬렉션 이름
 * @param {Object|null} query - 데이터를 필터링할 조건 객체. `null`을 전달하면 모든 데이터를 가져옵니다.
 * @param {string} query.comp - 조건을 적용할 필드 이름
 * @param {string} query.sign - Firestore 비교 연산자 (예: '==', '<', '>', '!=' 등)
 * @param {*} query.val - 비교할 값
 * @param {boolean} [fetchMultiples=false] - 여러 문서를 가져올지 여부. `true`이면 모든 문서를, `false`이면 첫 번째 문서만 반환합니다.
 * @returns {Promise<Object|Object[]>} - 단일 문서 객체(기본값) 또는 문서 배열
 *
 * @example
 * // 조건에 맞는 단일 문서 가져오기
 * const result = await fetchDataWithQuery('artists', {
 *   comparingField: 'genre',
 *   opStr: '==',
 *   targetValue: 'K-pop'
 * });
 * console.log(result);
 *
 * @example
 * // 조건 없이 컬렉션의 모든 문서 가져오기
 * const allData = await fetchDataWithQuery('artists', null, true);
 * console.log(allData);
 */
export async function fetchData(
    collectionName,
    queryObj = { comp: '', sign: '==', val: '' }, // 기본값 설정
    fetchMultiples = false
  ) {
    try {
      // 문서 ID로 직접 조회
      if (queryObj?.comp === 'docId' && queryObj.val) {
        const docId = queryObj.val;
        const docRef = doc(db, collectionName, docId);
        const docSnap = await getDoc(docRef);
  
        if (!docSnap.exists()) {
          console.warn(`Document with ID '${docId}' not found.`);
          return null;
        }
  
        // 단일 문서 데이터 반환
        const data = { id: docSnap.id, ...docSnap.data() };
        return serializeFirestoreData(data); // 데이터 직렬화
      }
  
      // Firestore 컬렉션 참조 생성
      const collectionRef = collection(db, collectionName);
  
      // 쿼리 조건 적용
      let firestoreQuery = collectionRef;
      if (queryObj?.comp && queryObj?.sign && queryObj?.val) {
        firestoreQuery = query(collectionRef, where(queryObj.comp, queryObj.sign, queryObj.val));
      }
  
      // Firestore 쿼리 실행
      const querySnapshot = await getDocs(firestoreQuery);
  
      if (querySnapshot.empty) {
        console.warn('No documents found matching the query.');
        return fetchMultiples ? [] : null;
      }
  
      // 결과 데이터를 매핑
      const data = querySnapshot.docs.map((doc) => ({
        docId: doc.id,
        ...doc.data(),
      }));
  
      // 다중/단일 결과 반환 처리
      return fetchMultiples
        ? serializeFirestoreData(data) // 다중 문서 직렬화
        : serializeFirestoreData(data[0]); // 첫 번째 문서만 직렬화
    } catch (error) {
      console.error(
        `Error fetching data from collection '${collectionName}' ${
          queryObj?.comp ? `with query (${queryObj.comp} ${queryObj.sign} ${queryObj.val})` : 'without specific query'
        }:`,
        error
      );
      return fetchMultiples ? [] : null;
    }
}

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
export async function createUniqueInviteCode(email) {
    if (!email) {
      throw new Error("Email is required to generate an invite code.");
    }
  
    function hashEmail(email) {
      // 간단한 해시 생성 (이메일 앞부분을 랜덤성 강화)
      const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
      let hash = 0;
      for (let i = 0; i < email.length; i++) {
        hash = (hash << 5) - hash + email.charCodeAt(i);
        hash |= 0; // 32비트 정수 변환
      }
      hash = Math.abs(hash); // 음수를 양수로 변환
      let result = "";
      while (result.length < 4) {
        result += characters[hash % characters.length];
        hash = Math.floor(hash / characters.length);
      }
      return result.toUpperCase();
    }
  
    function generateInviteCode(email) {
      const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
      const emailHash = hashEmail(email); // 이메일 기반 해시 생성
      let randomPart = "";
      for (let i = 0; i < 4; i++) {
        randomPart += characters.charAt(Math.floor(Math.random() * characters.length));
      }
      return `${emailHash}${randomPart}`; // 이메일 해시 + 랜덤 문자열
    }
  
    const collectionRef = collection(db, "StarglowPreRegistration"); // Firestore 컬렉션 참조
    let isUnique = false;
    let inviteCode = "";
  
    while (!isUnique) {
      inviteCode = generateInviteCode(email); // 이메일 기반 + 랜덤 초대 코드 생성
      const q = query(collectionRef, where("inviteCode", "==", inviteCode));
      const querySnapshot = await getDocs(q);
  
      if (querySnapshot.empty) isUnique = true;
    }
  
    return inviteCode;
}

export async function isUniqueUser(user) {
  if (!user || !user.id) {
      throw new Error('User 객체와 user.id가 필요합니다.');
  }

  try {
      const collectionRef = collection(db, "StarglowPreRegistration");
      const q = query(collectionRef, where("telegramUser.id", "==", user.id));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
          return null; // 고유 사용자임을 나타냄
      }

      // 등록된 사용자의 첫 번째 문서 데이터를 반환
      const userDoc = querySnapshot.docs[0];
      return { id: userDoc.id, ...userDoc.data() };
  } catch (error) {
      console.error("Error checking if user is unique:", error);
      throw error;
  }
}