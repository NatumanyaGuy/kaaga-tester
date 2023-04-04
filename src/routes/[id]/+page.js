// @ts-nocheck
import { db } from '$lib/firebaseConfig';
import { collection, query, where, doc, getDocs } from 'firebase/firestore';
const testsRef = collection(db, 'tests');
/*
Query for test
Check if logged in user ID == test id creator
*/

export async function load({ fetch, params }) {
	let d;
	const q = query(testsRef, where('id', '==', params.id));
	const querySnapshot = await getDocs(q);
	querySnapshot.forEach((doc) => {
		// doc.data() is never undefined for query doc snapshots
		// console.log(doc.id);
		d = doc.data();
		d.docId = doc.id;
	});

	if (d == undefined) {
		return { status: 'Not Found' };
	} else {
		return d;
	}
}
