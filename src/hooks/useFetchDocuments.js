import { useState, useEffect } from "react";
import { db } from "../firebase/config";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  where,
  doc,
  getDoc,
  QuerySnapshot,
} from "firebase/firestore";

export const useFetchDocuments = (
  docCollection,
  search = null,
  uid = null,
  id = null
) => {
  const [documents, setDocuments] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);

  //deal with memory leak
  const [cancelled, setCancelled] = useState(false);

  useEffect(() => {
    async function loadData() {
      if (cancelled) {
        return;
      }
      setLoading(true);

      const collectionRef = await collection(db, docCollection);

      try {
        let q;

        //Temos aqui um if pois este hook vai servir tanto para busca esepcifica quanto para pegar tudo da base de dados
        //se o search, que chaega aqui como parametro da função, tiver um valor eu vou querer que ele execute a query do valo no bd
        if (search) {
          //esta nossa busca , pra já, buscará posts somente pelas tags

          console.log("not uid entry");
          console.log(uid);
          q = await query(
            collectionRef,
            where("tagsArray", "array-contains", search),
            //lembre-se que esse where é uma propriedade importada do firebase, e receberá como argumento(em que coluna procurar, comando, o que se deve procurar)
            orderBy("createdAt", "desc")
          );
        } else if (id) {
          //serve ao clicar pra ver detalhes de um post
          const docRef = await doc(db, docCollection, id);
          const docSnap = await getDoc(docRef);
          setDocuments(docSnap.data());

          setLoading(false);
          return;
        } else if (uid) {

            console.log("uid entry");
          console.log(uid);
          //serve para mostrar posts de um usuario, inclusive a dashboard
          q = await query(
            collectionRef,
            where("uid", "==", uid),
            //lembre-se que esse where é uma propriedade importada do firebase, e receberá como argumento(em que coluna procurar, comando, o que se deve procurar)
            orderBy("createdAt", "desc")
          );
        } else {
          //busca geral

          //dashboard

          q = await query(collectionRef, orderBy("createdAt", "desc"));
          // aqui estou pegando todos os dados da collection e organizando por data de criação decrescente
        }

        onSnapshot(q, (querySnapshot) => {
          //o metodo snapShot além dos documentos, eles trazem outras informações, por isso tenho que acessar os docs e mapear cada documento.

          setDocuments(
            querySnapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(), //era pra linha  acima nao existir, mas por algum motivo o firebase nao traz o id no doc.data()
            }))
          );
        });
        //onSnapShot é um metodo do firebase vai observar se tem dados novos diferentes dos ja trazidos, e vai trazer os novos

        setLoading(false);
      } catch (error) {
        console.log(error);
        setError(error.message);
      }
    }

    loadData(); //lembre-se da estrutura do useEffect! esta linha serve para chamar a a função acima, snão ela não é executada
  }, [docCollection, search, uid, cancelled]); // vou fazer fetch de dados quando algum desses dados for modificado, no caso do cancelled servirá para cancelar a execução do hook, conforme comando acima dentro da função

  useEffect(() => {
    return () => setCancelled(true);
  }, []);

  return { documents, loading, error };
};
