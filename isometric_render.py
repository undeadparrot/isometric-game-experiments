original_rotation = C.active_object.rotation_euler.copy()
for dir, radians in [
  ('n', 0),
  ('e', 0.25*pi),
  ('s', 0.5*pi),
  ('w', 0.75*pi),
]:
    C.active_object.rotation_euler.rotate(Euler([0,0,0.25*pi]))
    for frame in range(1, C.scene.frame_end, 5):
        C.scene.frame_set(frame)
        bpy.ops.render.render()
        bpy.data.images['Render Result'].save_render(
            '/tmp/render{}.png'.format(frame)
        )
    C.active_object.rotation_euler = original_rotation
    
