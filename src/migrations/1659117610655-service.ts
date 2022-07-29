import { MigrationInterface, QueryRunner } from 'typeorm';

export class service1659117610655 implements MigrationInterface {
  name = 'service1659117610655';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "login" character varying NOT NULL, "password" character varying NOT NULL, "version" integer NOT NULL, "createdAt" bigint NOT NULL, "updatedAt" bigint NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "album" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "year" integer NOT NULL, "artistId" uuid, CONSTRAINT "REL_3d06f25148a4a880b429e3bc83" UNIQUE ("artistId"), CONSTRAINT "PK_58e0b4b8a31bb897e6959fe3206" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "track" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "duration" integer NOT NULL, "albumId" uuid, "artistId" uuid, CONSTRAINT "REL_b105d945c4c185395daca91606" UNIQUE ("albumId"), CONSTRAINT "REL_997cfd9e91fd00a363500f72dc" UNIQUE ("artistId"), CONSTRAINT "PK_0631b9bcf521f8fab3a15f2c37e" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "artist" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "grammy" boolean NOT NULL, CONSTRAINT "PK_55b76e71568b5db4d01d3e394ed" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "favs" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "userId" uuid, CONSTRAINT "REL_740118ee0ee7aa734767a98576" UNIQUE ("userId"), CONSTRAINT "PK_2fde25c80bd089c0fa0e7986409" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "favs_artists_artist" ("favsId" uuid NOT NULL, "artistId" uuid NOT NULL, CONSTRAINT "PK_1481fb77ddcdbb19d1b352d482e" PRIMARY KEY ("favsId", "artistId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_36bb34af2af752589eec34801b" ON "favs_artists_artist" ("favsId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_00013e2487b72b699e832c908d" ON "favs_artists_artist" ("artistId") `,
    );
    await queryRunner.query(
      `CREATE TABLE "favs_albums_album" ("favsId" uuid NOT NULL, "albumId" uuid NOT NULL, CONSTRAINT "PK_f02da7a8468fe07aedcb0794de1" PRIMARY KEY ("favsId", "albumId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_b18e0234b876553233673338c6" ON "favs_albums_album" ("favsId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_b88b4519e4fee493eadad25ac6" ON "favs_albums_album" ("albumId") `,
    );
    await queryRunner.query(
      `CREATE TABLE "favs_tracks_track" ("favsId" uuid NOT NULL, "trackId" uuid NOT NULL, CONSTRAINT "PK_f100bdd437cefaac9791e126ffe" PRIMARY KEY ("favsId", "trackId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_de231f68f716751fd438156ba4" ON "favs_tracks_track" ("favsId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_973eee73790207107758136887" ON "favs_tracks_track" ("trackId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "album" ADD CONSTRAINT "FK_3d06f25148a4a880b429e3bc839" FOREIGN KEY ("artistId") REFERENCES "artist"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "track" ADD CONSTRAINT "FK_b105d945c4c185395daca91606a" FOREIGN KEY ("albumId") REFERENCES "album"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "track" ADD CONSTRAINT "FK_997cfd9e91fd00a363500f72dc2" FOREIGN KEY ("artistId") REFERENCES "artist"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "favs" ADD CONSTRAINT "FK_740118ee0ee7aa734767a985763" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "favs_artists_artist" ADD CONSTRAINT "FK_36bb34af2af752589eec34801b6" FOREIGN KEY ("favsId") REFERENCES "favs"("id") ON DELETE SET NULL ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "favs_artists_artist" ADD CONSTRAINT "FK_00013e2487b72b699e832c908d6" FOREIGN KEY ("artistId") REFERENCES "artist"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "favs_albums_album" ADD CONSTRAINT "FK_b18e0234b876553233673338c68" FOREIGN KEY ("favsId") REFERENCES "favs"("id") ON DELETE SET NULL ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "favs_albums_album" ADD CONSTRAINT "FK_b88b4519e4fee493eadad25ac66" FOREIGN KEY ("albumId") REFERENCES "album"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "favs_tracks_track" ADD CONSTRAINT "FK_de231f68f716751fd438156ba40" FOREIGN KEY ("favsId") REFERENCES "favs"("id") ON DELETE SET NULL ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "favs_tracks_track" ADD CONSTRAINT "FK_973eee737902071077581368872" FOREIGN KEY ("trackId") REFERENCES "track"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "favs_tracks_track" DROP CONSTRAINT "FK_973eee737902071077581368872"`,
    );
    await queryRunner.query(
      `ALTER TABLE "favs_tracks_track" DROP CONSTRAINT "FK_de231f68f716751fd438156ba40"`,
    );
    await queryRunner.query(
      `ALTER TABLE "favs_albums_album" DROP CONSTRAINT "FK_b88b4519e4fee493eadad25ac66"`,
    );
    await queryRunner.query(
      `ALTER TABLE "favs_albums_album" DROP CONSTRAINT "FK_b18e0234b876553233673338c68"`,
    );
    await queryRunner.query(
      `ALTER TABLE "favs_artists_artist" DROP CONSTRAINT "FK_00013e2487b72b699e832c908d6"`,
    );
    await queryRunner.query(
      `ALTER TABLE "favs_artists_artist" DROP CONSTRAINT "FK_36bb34af2af752589eec34801b6"`,
    );
    await queryRunner.query(
      `ALTER TABLE "favs" DROP CONSTRAINT "FK_740118ee0ee7aa734767a985763"`,
    );
    await queryRunner.query(
      `ALTER TABLE "track" DROP CONSTRAINT "FK_997cfd9e91fd00a363500f72dc2"`,
    );
    await queryRunner.query(
      `ALTER TABLE "track" DROP CONSTRAINT "FK_b105d945c4c185395daca91606a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "album" DROP CONSTRAINT "FK_3d06f25148a4a880b429e3bc839"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_973eee73790207107758136887"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_de231f68f716751fd438156ba4"`,
    );
    await queryRunner.query(`DROP TABLE "favs_tracks_track"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_b88b4519e4fee493eadad25ac6"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_b18e0234b876553233673338c6"`,
    );
    await queryRunner.query(`DROP TABLE "favs_albums_album"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_00013e2487b72b699e832c908d"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_36bb34af2af752589eec34801b"`,
    );
    await queryRunner.query(`DROP TABLE "favs_artists_artist"`);
    await queryRunner.query(`DROP TABLE "favs"`);
    await queryRunner.query(`DROP TABLE "artist"`);
    await queryRunner.query(`DROP TABLE "track"`);
    await queryRunner.query(`DROP TABLE "album"`);
    await queryRunner.query(`DROP TABLE "user"`);
  }
}
