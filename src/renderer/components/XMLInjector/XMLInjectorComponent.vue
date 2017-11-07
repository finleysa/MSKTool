<template>
    <div class="xml-injector">
        <div class="columns">
            <div class="column">
                <label>IP Address</label>
                <label>Port</label>
            </div>
            <div class="column">
                <input type="text" placeholder="0.0.0.0"/>
            </div>
        </div>

        <div class="field">
            <button id="openFile" v-on:click="openFile">Open</button>
        </div>
        <textarea id="editor" style="width: 400px; height: 300px;"></textarea>

    </div>
</template>

<script>


    export default {
        name: 'xml-injector',
        components: {},
        methods: {
            openFile(event) {
                dialog.showOpenDialog(function (fileNames) {
                    if (fileNames === undefined) return;
                    let fileName = fileNames[0];
                    fs.readFile(fileName, 'utf-8', function (err, data) {
                        document.getElementById("editor").value = data;
                    });
                });
            }
        }
    }
</script>