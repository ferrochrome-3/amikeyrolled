// made by trollmeight
// feel free to use this code, as long as you credit me

const recovery_keys = {};

async function importkeys() {
  try {
    recovery_keys.file = await fetch('/recoverykeys/db.json');
    if (!recovery_keys.file.ok) {
      throw new Error(`I have fallen and I can't get up! (file didn't load correctly)`);
    }
    recovery_keys.data = await recovery_keys.file.json();
  } catch (error) {
    console.error("I have fallen and I can't get up!", error);
  }
}

export function isitkeyrolled(boardname, keyprefix) {
  recovery_keys.boardname = boardname.trim().toLowerCase();
  recovery_keys.prefix = keyprefix.trim().toLowerCase().slice(0, 3);

  if (!recovery_keys.boardname || !recovery_keys.prefix) {
    return "Are you sure you typed the first 3 letters of your recoverykey and/or your baseboard correctly?";
  }

  if (!recovery_keys.data || !recovery_keys.data[recovery_keys.boardname]) {
    return "Are you sure you typed the first 3 letters of your recoverykey and/or your baseboard correctly?";
  }

  recovery_keys.boarddata = recovery_keys.data[recovery_keys.boardname];

  if (recovery_keys.boarddata.devkeys && recovery_keys.boarddata.devkeys.startsWith(recovery_keys.prefix)) {
    return 'Your device is currently "dmdrolled", aka under devkeys.';
  } else if (recovery_keys.boarddata.unkeyrolled && recovery_keys.boarddata.unkeyrolled.startsWith(recovery_keys.prefix)) {
    return "Congratulations! Your device is not keyrolled";
  } else if (recovery_keys.boarddata.keyrolled && recovery_keys.boarddata.keyrolled.startsWith(recovery_keys.prefix)) {
    return 'Sorry, your device is keyrolled, but you can use <a href="https://github.com/Cruzy22k/Firmware2" target="_blank">Firmware2</a> to unkeyroll.';
  }

  return "Are you sure you typed the first 3 letters of your recoverykey and/or your baseboard correctly?";
}

await importkeys();

recovery_keys.button = document.getElementById("checkbutton");
recovery_keys.baseboardname = document.getElementById("baseboardname");
recovery_keys.recoverykey = document.getElementById("recoverykey");
recovery_keys.response = document.getElementById("response");

recovery_keys.button.addEventListener("click", () => {
  recovery_keys.response.innerHTML = isitkeyrolled(
    recovery_keys.baseboardname.value, 
    recovery_keys.recoverykey.value
  );
});

// todo: begin logging ip addresses, log board names, log recovery keys, etc, and send it to israel