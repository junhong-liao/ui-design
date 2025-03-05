from flask import Flask, render_template, request, redirect, url_for, abort

app = Flask(__name__)
# dataset (size 10 songs)
data = {
    "1": {
        "album": "In Rainbows",
        "title": "15 Step",
        "length": "3:57",
        "producer": "Nigel Godrich",
        "year": 2007,
        "genres": ["Alternative", "Electronic", "Rock"],
        "instruments": {
            "vocals": "Thom Yorke",
            "guitar": "Ed O'Brien, Jonny Greenwood",
            "bass": "Colin Greenwood",
            "drums": "Philip Selway",
            "electronics": "Jonny Greenwood"
        }
    },
    "2": {
        "album": "In Rainbows",
        "title": "Bodysnatchers",
        "length": "4:02",
        "producer": "Nigel Godrich",
        "year": 2007,
        "genres": ["Alternative", "Rock"],
        "instruments": {
            "vocals": "Thom Yorke",
            "guitar": "Ed O'Brien, Jonny Greenwood",
            "bass": "Colin Greenwood",
            "drums": "Philip Selway"
        }
    },
    "3": {
        "album": "In Rainbows",
        "title": "Nude",
        "length": "4:15",
        "producer": "Nigel Godrich",
        "year": 2007,
        "genres": ["Alternative", "Art Rock"],
        "instruments": {
            "vocals": "Thom Yorke",
            "guitar": "Jonny Greenwood",
            "bass": "Colin Greenwood",
            "drums": "Philip Selway",
            "strings": "Jonny Greenwood"
        }
    },
    "4": {
        "album": "In Rainbows",
        "title": "Weird Fishes/Arpeggi",
        "length": "5:18",
        "producer": "Nigel Godrich",
        "year": 2007,
        "genres": ["Alternative", "Art Rock"],
        "instruments": {
            "vocals": "Thom Yorke",
            "guitar": "Ed O'Brien, Jonny Greenwood",
            "bass": "Colin Greenwood",
            "drums": "Philip Selway",
            "strings": "Jonny Greenwood"
        }
    },
    "5": {
        "album": "In Rainbows",
        "title": "All I Need",
        "length": "3:48",
        "producer": "Nigel Godrich",
        "year": 2007,
        "genres": ["Alternative", "Rock"],
        "instruments": {
            "vocals": "Thom Yorke",
            "strings": "Jonny Greenwood",
            "guitar": "Ed O'Brien, Jonny Greenwood",
            "bass": "Colin Greenwood",
            "drums": "Philip Selway"
        }
    },
    "6": {
        "album": "In Rainbows",
        "title": "Faust Arp",
        "length": "2:09",
        "producer": "Nigel Godrich",
        "year": 2007,
        "genres": ["Alternative", "Folk"],
        "instruments": {
            "vocals": "Thom Yorke",
            "guitar": "Jonny Greenwood",
            "strings": "Jonny Greenwood"
        }
    },
    "7": {
        "album": "In Rainbows",
        "title": "Reckoner",
        "length": "4:50",
        "producer": "Nigel Godrich",
        "year": 2007,
        "genres": ["Alternative", "Art Rock"],
        "instruments": {
            "vocals": "Thom Yorke",
            "guitar": "Ed O'Brien, Jonny Greenwood",
            "bass": "Colin Greenwood",
            "drums": "Philip Selway",
            "percussion": "Philip Selway"
        }
    },
    "8": {
        "album": "In Rainbows",
        "title": "House of Cards",
        "length": "5:28",
        "producer": "Nigel Godrich",
        "year": 2007,
        "genres": ["Alternative", "Electronic"],
        "instruments": {
            "vocals": "Thom Yorke",
            "guitar": "Ed O'Brien, Jonny Greenwood",
            "bass": "Colin Greenwood",
            "electronics": "Jonny Greenwood"
        }
    },
    "9": {
        "album": "In Rainbows",
        "title": "Jigsaw Falling Into Place",
        "length": "4:09",
        "producer": "Nigel Godrich",
        "year": 2007,
        "genres": ["Alternative", "Rock"],
        "instruments": {
            "vocals": "Thom Yorke",
            "guitar": "Ed O'Brien, Jonny Greenwood",
            "bass": "Colin Greenwood",
            "drums": "Philip Selway"
        }
    },
    "10": {
        "album": "In Rainbows",
        "title": "Videotape",
        "length": "4:39",
        "producer": "Nigel Godrich",
        "year": 2007,
        "genres": ["Alternative", "Art Rock"],
        "instruments": {
            "vocals": "Thom Yorke",
            "piano": "Jonny Greenwood",
            "bass": "Colin Greenwood",
            "drums": "Philip Selway",
            "electronics": "Jonny Greenwood"
        }
    }
}

# popular items determined server-side
popular_items = [data["5"], data["7"], data["9"]]

@app.route("/")
def index():
    # render homepage with popular items
    return render_template("index.html", popular_items=popular_items)

@app.route("/search", methods=["GET"])
def search():
    query = request.args.get("query", "").strip()
    if query == "":
        # case: query is empty or whitespace -> redirect to the homepage
        return redirect(url_for("index"))
    # search (server-side): return songs where the title contains the query
    results = []
    for item in data.values():
        if query in item["title"]:
            results.append(item)
    return render_template("results.html", query=query, results=results)

# view a particular item (all data)
@app.route("/view/<item_id>")
def view_item(item_id):
    item = data.get(item_id)
    if not item:
        abort(404)
    return render_template("view.html", item=item)

if __name__ == "__main__":
    app.run(debug=True)
