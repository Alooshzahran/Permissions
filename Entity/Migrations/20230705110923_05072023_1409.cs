using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Entity.Migrations
{
    /// <inheritdoc />
    public partial class _05072023_1409 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ModulePropertiesRole");

            migrationBuilder.CreateTable(
                name: "ModuleProperties_Role",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ModulePropertiesID = table.Column<int>(type: "int", nullable: false),
                    RoleID = table.Column<int>(type: "int", nullable: false),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false),
                    CreationUserID = table.Column<int>(type: "int", nullable: false),
                    CreationDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ModifyingUserID = table.Column<int>(type: "int", nullable: true),
                    ModifyingDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    DeleteUserID = table.Column<int>(type: "int", nullable: true),
                    DeleteDate = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ModuleProperties_Role", x => x.ID);
                    table.ForeignKey(
                        name: "FK_ModuleProperties_ModuleProperties_Role",
                        column: x => x.ModulePropertiesID,
                        principalTable: "ModuleProperties",
                        principalColumn: "ID");
                    table.ForeignKey(
                        name: "FK_Role_ModuleProperties_Role",
                        column: x => x.RoleID,
                        principalTable: "Role",
                        principalColumn: "ID");
                });

            migrationBuilder.UpdateData(
                table: "Role",
                keyColumn: "ID",
                keyValue: 1,
                column: "CreationDate",
                value: new DateTime(2023, 7, 5, 14, 9, 23, 271, DateTimeKind.Local).AddTicks(804));

            migrationBuilder.UpdateData(
                table: "Role",
                keyColumn: "ID",
                keyValue: 2,
                column: "CreationDate",
                value: new DateTime(2023, 7, 5, 14, 9, 23, 271, DateTimeKind.Local).AddTicks(815));

            migrationBuilder.UpdateData(
                table: "Role",
                keyColumn: "ID",
                keyValue: 3,
                column: "CreationDate",
                value: new DateTime(2023, 7, 5, 14, 9, 23, 271, DateTimeKind.Local).AddTicks(817));

            migrationBuilder.UpdateData(
                table: "Role",
                keyColumn: "ID",
                keyValue: 4,
                column: "CreationDate",
                value: new DateTime(2023, 7, 5, 14, 9, 23, 271, DateTimeKind.Local).AddTicks(818));

            migrationBuilder.UpdateData(
                table: "User",
                keyColumn: "ID",
                keyValue: 1,
                column: "CreationDate",
                value: new DateTime(2023, 7, 5, 11, 9, 23, 271, DateTimeKind.Utc).AddTicks(717));

            migrationBuilder.CreateIndex(
                name: "IX_ModuleProperties_Role_ModulePropertiesID",
                table: "ModuleProperties_Role",
                column: "ModulePropertiesID");

            migrationBuilder.CreateIndex(
                name: "IX_ModuleProperties_Role_RoleID",
                table: "ModuleProperties_Role",
                column: "RoleID");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ModuleProperties_Role");

            migrationBuilder.CreateTable(
                name: "ModulePropertiesRole",
                columns: table => new
                {
                    ModulePropertiesID = table.Column<int>(type: "int", nullable: false),
                    RoleID = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ModulePropertiesRole", x => new { x.ModulePropertiesID, x.RoleID });
                    table.ForeignKey(
                        name: "FK_ModulePropertiesRole_ModuleProperties_ModulePropertiesID",
                        column: x => x.ModulePropertiesID,
                        principalTable: "ModuleProperties",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ModulePropertiesRole_Role_RoleID",
                        column: x => x.RoleID,
                        principalTable: "Role",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.UpdateData(
                table: "Role",
                keyColumn: "ID",
                keyValue: 1,
                column: "CreationDate",
                value: new DateTime(2023, 7, 5, 10, 47, 19, 710, DateTimeKind.Local).AddTicks(5078));

            migrationBuilder.UpdateData(
                table: "Role",
                keyColumn: "ID",
                keyValue: 2,
                column: "CreationDate",
                value: new DateTime(2023, 7, 5, 10, 47, 19, 710, DateTimeKind.Local).AddTicks(5087));

            migrationBuilder.UpdateData(
                table: "Role",
                keyColumn: "ID",
                keyValue: 3,
                column: "CreationDate",
                value: new DateTime(2023, 7, 5, 10, 47, 19, 710, DateTimeKind.Local).AddTicks(5089));

            migrationBuilder.UpdateData(
                table: "Role",
                keyColumn: "ID",
                keyValue: 4,
                column: "CreationDate",
                value: new DateTime(2023, 7, 5, 10, 47, 19, 710, DateTimeKind.Local).AddTicks(5090));

            migrationBuilder.UpdateData(
                table: "User",
                keyColumn: "ID",
                keyValue: 1,
                column: "CreationDate",
                value: new DateTime(2023, 7, 5, 7, 47, 19, 710, DateTimeKind.Utc).AddTicks(5000));

            migrationBuilder.CreateIndex(
                name: "IX_ModulePropertiesRole_RoleID",
                table: "ModulePropertiesRole",
                column: "RoleID");
        }
    }
}
