import { firebaseConfig } from "../firebase-config.js";

const setupWarning = document.getElementById("setup-warning");
const whoScreen = document.getElementById("who-screen");
const boardScreen = document.getElementById("board-screen");
const currentUserLabel = document.getElementById("current-user-label");
const switchUserBtn = document.getElementById("switch-user");
const noteForm = document.getElementById("note-form");
const noteInput = document.getElementById("note-input");
const charCount = document.getElementById("char-count");
const notesBoard = document.getElementById("notes-board");
const notesStatus = document.getElementById("notes-status");

const STORAGE_KEY = "bilhetes-quem-sou-eu";
const configPronto = firebaseConfig.apiKey && firebaseConfig.apiKey !== "SUBSTITUA_AQUI";

if (!configPronto) {
  setupWarning.classList.remove("hidden");
} else {
  iniciar();
}

async function iniciar() {
  const { initializeApp } = await import("https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js");
  const { getAuth, signInAnonymously, onAuthStateChanged } = await import(
    "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js"
  );
  const {
    getFirestore,
    collection,
    addDoc,
    query,
    orderBy,
    limit,
    onSnapshot,
    serverTimestamp,
  } = await import("https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js");

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const db = getFirestore(app);

  notesStatus.textContent = "conectando...";

  onAuthStateChanged(auth, (user) => {
    if (user) {
      mostrarTelaCorreta();
      escutarBilhetes();
    }
  });

  signInAnonymously(auth).catch((err) => {
    console.error(err);
    notesStatus.textContent = "Não consegui conectar. Confira a configuração do Firebase.";
  });

  function mostrarTelaCorreta() {
    const quemSouEu = localStorage.getItem(STORAGE_KEY);
    if (quemSouEu) {
      whoScreen.classList.add("hidden");
      boardScreen.classList.remove("hidden");
      currentUserLabel.textContent = quemSouEu;
    } else {
      whoScreen.classList.remove("hidden");
      boardScreen.classList.add("hidden");
    }
  }

  whoScreen.querySelectorAll("[data-user]").forEach((btn) => {
    btn.addEventListener("click", () => {
      localStorage.setItem(STORAGE_KEY, btn.dataset.user);
      mostrarTelaCorreta();
    });
  });

  switchUserBtn.addEventListener("click", () => {
    localStorage.removeItem(STORAGE_KEY);
    mostrarTelaCorreta();
  });

  noteInput.addEventListener("input", () => {
    charCount.textContent = `${noteInput.value.length}/500`;
  });

  noteForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const texto = noteInput.value.trim();
    const autora = localStorage.getItem(STORAGE_KEY);
    if (!texto || !autora) return;

    const submitBtn = noteForm.querySelector("button[type=submit]");
    submitBtn.disabled = true;

    try {
      await addDoc(collection(db, "bilhetes"), {
        autora,
        texto,
        criadoEm: serverTimestamp(),
      });
      noteInput.value = "";
      charCount.textContent = "0/500";
    } catch (err) {
      console.error(err);
      notesStatus.textContent = "Não consegui salvar o bilhete. Tenta de novo?";
    } finally {
      submitBtn.disabled = false;
    }
  });

  function escutarBilhetes() {
    const q = query(collection(db, "bilhetes"), orderBy("criadoEm", "desc"), limit(100));
    onSnapshot(
      q,
      (snapshot) => {
        notesStatus.textContent = "";
        if (snapshot.empty) {
          notesBoard.innerHTML = `<div class="empty-state">Nenhum bilhete ainda por aqui.<br>Escreva o primeiro! 💛</div>`;
          return;
        }
        notesBoard.innerHTML = "";
        snapshot.forEach((doc) => {
          const data = doc.data();
          notesBoard.appendChild(criarNoteCard(data));
        });
      },
      (err) => {
        console.error(err);
        notesStatus.textContent = "Não consegui carregar os bilhetes agora.";
      }
    );
  }

  function criarNoteCard(data) {
    const div = document.createElement("div");
    div.className = `note from-${data.autora === "Leh" ? "Leh" : "Lara"}`;

    const p = document.createElement("p");
    p.className = "note-text";
    p.textContent = data.texto || "";

    const meta = document.createElement("div");
    meta.className = "note-meta";

    const author = document.createElement("span");
    author.className = "note-author";
    author.textContent = data.autora || "?";

    const time = document.createElement("span");
    time.textContent = formatarQuando(data.criadoEm);

    meta.appendChild(author);
    meta.appendChild(time);
    div.appendChild(p);
    div.appendChild(meta);
    return div;
  }

  function formatarQuando(timestamp) {
    if (!timestamp || !timestamp.toDate) return "agora";
    const data = timestamp.toDate();
    const diffMs = Date.now() - data.getTime();
    const diffMin = Math.floor(diffMs / 60000);
    if (diffMin < 1) return "agora";
    if (diffMin < 60) return `há ${diffMin} min`;
    const diffH = Math.floor(diffMin / 60);
    if (diffH < 24) return `há ${diffH}h`;
    const diffD = Math.floor(diffH / 24);
    if (diffD < 7) return `há ${diffD}d`;
    return data.toLocaleDateString("pt-BR");
  }
}
