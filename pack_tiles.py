import argparse, glob, json, re, dataclasses, typing, textwrap
import PIL.Image,PIL.ImageDraw

@dataclasses.dataclass
class RenderFile:
    filename: str
    name: str
    direction: str
    frame: int
    points: typing.List[int]


@dataclasses.dataclass
class MappedRender:
    render: RenderFile
    filename: str
    sx: int
    sy: int
    sw: int
    sh: int
    leftPadding: int
    topPadding: int
    wMult: float
    hMult: float

    def make_id(self):
        return f"{self.render.name}_{self.render.direction}_{self.render.points[0]}{self.render.points[1]}{self.render.points[2]}{self.render.points[3]}"

def find_renders() -> typing.List[RenderFile]:
    renders = []
    for filename in glob.glob("render.*.png"):
        match = re.match(
            r"render\.(.*)\.(n|e|w|s)\.(\d+)\.(\d)_(\d)_(\d)_(\d)\.png", filename
        )
        if match:
            name, direction, frame, b0, b1, b2, b3 = match.groups()
            renders.append(
                RenderFile(
                    filename,
                    name,
                    direction,
                    int(frame),
                    [int(b0), int(b1), int(b2), int(b3)],
                )
            )
    return renders

def pack_renders_in_atlas(atlas_width:int, atlas_height:int, min_tile_width:int, min_tile_height:int,renders: typing.List[RenderFile],  debug=False):
    tilesheet_number = 0
    while renders:
        atlas = PIL.Image.new("RGBA", (atlas_width, atlas_height))
        atlas_draw = PIL.ImageDraw.Draw(atlas, 'RGBA')   
        
        tilesheet_filename = f"tilesheet.{tilesheet_number}.{atlas_width}x{atlas_height}.png"
        mapped_renders = []

        print("new texture atlas", tilesheet_filename)

        x = 0
        y = 0
        y_advance = 0

        while renders:
            render = renders.pop()
            img = PIL.Image.open(render.filename)

            print("img              ", render.filename, img.width, img.height)

            while True:
                print("                 ", x, y, y_advance)
                not_enough_width = img.width > atlas_width - x
                not_enough_height = img.height > atlas_height - y
                just_way_too_big = img.width > atlas_width or img.height > atlas_height
                if just_way_too_big:
                    raise Exception("Too big!")

                if not_enough_height:
                    raise Exception("Too tall for atlas")

                if not_enough_width:
                    print("not enough width?", x, y, y_advance)
                    x = 0
                    y = y + y_advance
                    y_advance = 0
                    print("y   advance     !", x, y, y_advance)
                    
                    if y >= atlas.height:
                        raise Exception("Atlas full")
                    continue
                break

            atlas.paste(img, (x, y))
            if debug:
                atlas_draw.line([(x,y),(x+img.width,y)], fill ="red", width = 1) 
                atlas_draw.line([(x,y),(x,y+img.height)], fill ="red", width = 1) 
                atlas_draw.line([(x,y+img.height),(x+img.width,y+img.height)], fill ="red", width = 1) 
                atlas_draw.line([(x+img.width,y),(x+img.width,y+img.height)], fill ="red", width = 1) 
                atlas_draw.text(xy=(x,y), text="\n".join(textwrap.wrap(render.filename, img.width//7)), fill="blue")

            left_padding = (img.width - min_tile_width) / 2
            top_padding = img.height - min_tile_height
            w_multiplier = (min_tile_width / 2 + left_padding) / (min_tile_width/2)
            h_multiplier = (min_tile_height + top_padding) / min_tile_height
            mapped_renders.append(
                MappedRender(
                    render=render,
                    filename=tilesheet_filename,
                    sx=x,
                    sy=y,
                    sw=img.width,
                    sh=img.height,
                    leftPadding=left_padding,
                    topPadding=top_padding,
                    wMult=w_multiplier,
                    hMult=h_multiplier,
                )
            )
            print("packed           ", x, y)

            x += img.width
            y_advance = max(y_advance,img.height)

        atlas.save(tilesheet_filename)
        with open(tilesheet_filename + ".json", "w") as f:
            payload = {_.make_id(): dataclasses.asdict(_) for _ in mapped_renders}
            json.dump(payload, f, indent=2)

if __name__ == '__main__':
    parser = argparse.ArgumentParser("tilepacker")
    parser.add_argument("width", type=int)
    parser.add_argument("height", type=int)
    parser.add_argument("min_tile_width", type=int)
    parser.add_argument("min_tile_height", type=int)
    parser.add_argument("--debug", default=False, action="store_true")
    args = parser.parse_args()

    renders = find_renders()
    pack_renders_in_atlas(args.width, args.height, args.min_tile_width, args.min_tile_height, renders, debug=args.debug)
    

